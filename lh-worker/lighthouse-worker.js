import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

import { S3Uploader } from './services/s3.js';
import { getConfig as getLighthouseConfig } from './config/lighthouse.js';
import { getConfig as getS3Config } from './config/s3.js';
import { supabase } from './services/supa.js';

class LighthouseWorker {
  constructor() {
    const lighthouseConfig = getLighthouseConfig();
    const s3Config = getS3Config();

    this.urlToTest = lighthouseConfig.url;
    this.s3Uploader = new S3Uploader(s3Config);
  }

  async run() {
    const chrome = await this.launchChrome();

    try {
      const { data, error: insertError } = await supabase.from("lighthouse_result").insert([
        {
          job_id: process.env.TRACE_ID,
          region: getLighthouseConfig().region,
          status: 'RUNNING',
        }
      ]).select();

      if (insertError) {
        console.error('Error inserting Lighthouse report into Supabase:', insertError);
        throw new Error('Failed to insert Lighthouse report into Supabase');
      }

      const runnerResult = await this.runLighthouseAudit(chrome);
      await this.processAndUploadResults(runnerResult, data[0].id);
    } catch (error) {
      console.error('Error during Lighthouse audit:', error);
      // UPDATE running job in Supabase
      const { error: updateError } = await supabase.from("lighthouse_result").update({
        status: 'FAILED',
        completed_at: new Date().toISOString(),
      }).eq('id', data[0].id);

      if (updateError) {
        console.error('Error updating Lighthouse report into Supabase:', updateError);
      }
      throw error;
    } finally {
      chrome.kill();
    }
  }

  async launchChrome() {
    return chromeLauncher.launch({
      chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox'],
      logLevel: 'info',
    });
  }

  async runLighthouseAudit(chrome) {
    const options = {
      logLevel: 'info',
      output: ['html', 'json'],
      onlyCategories: ['performance'],
      port: chrome.port,
    };

    return lighthouse(this.urlToTest, options);
  }

  async processAndUploadResults(runnerResult, resultID) {
    console.log('Procces for Result: ', resultID);

    const reports = runnerResult.report;
    const htmlResult = reports[0];
    const jsonResult = reports[1];

    const safeUrl = this.urlToTest.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const timestamp = Date.now();
    const htmlKey = `lh/${safeUrl}_${timestamp}.html`;
    const jsonKey = `lh/${safeUrl}_${timestamp}.json`;

    await this.s3Uploader.upload(htmlKey, htmlResult, 'text/html');
    await this.s3Uploader.upload(jsonKey, jsonResult, 'application/json');

    // UPDATE running job in Supabase
    const { data: updateData, error: updateError } = await supabase.from("lighthouse_result").update({
        status: 'COMPLETED',
        completed_at: new Date().toISOString(),
        s3_report_url: `https://${getS3Config().bucketName}.s3.amazonaws.com/${htmlKey}`,
        s3_metrics_json_url: `https://${getS3Config().bucketName}.s3.amazonaws.com/${jsonKey}`,
        fcp: runnerResult.lhr.audits['first-contentful-paint'].numericValue,
        lcp: runnerResult.lhr.audits['largest-contentful-paint'].numericValue,
        tbt: runnerResult.lhr.audits['total-blocking-time'].numericValue,
        cls: runnerResult.lhr.audits['cumulative-layout-shift'].numericValue,
        tti: runnerResult.lhr.audits['interactive'].numericValue,
      }).eq('id', resultID).select();

    console.log('insert result:', {
      updateData,
      error: updateError,
    });

    if (updateError) {
      console.error('Error updating Lighthouse report into Supabase:', error);
      throw new Error('Failed to update Lighthouse report into Supabase');
    }

    console.log('Reports uploaded to S3:', { htmlKey, jsonKey });
    console.log('Lighthouse audit completed successfully');
    // Exit the process after completion
    process.exit(0);
  }
}

export default LighthouseWorker;
