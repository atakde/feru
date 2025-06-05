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
      const runnerResult = await this.runLighthouseAudit(chrome);
      await this.processAndUploadResults(runnerResult);
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

  async processAndUploadResults(runnerResult) {
    const reports = runnerResult.report;
    const htmlResult = reports[0];
    const jsonResult = reports[1];

    const safeUrl = this.urlToTest.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const timestamp = Date.now();
    const htmlKey = `lh/${safeUrl}_${timestamp}.html`;
    const jsonKey = `lh/${safeUrl}_${timestamp}.json`;

    await this.s3Uploader.upload(htmlKey, htmlResult, 'text/html');
    await this.s3Uploader.upload(jsonKey, jsonResult, 'application/json');

    // Update the database with the results
    const { data, error } = await supabase.from('lighthouse').update({
      status: 'COMPLETED',
    }).eq('id', process.env.TRACE_ID).select();

    if (error) {
      console.error('Error updating Lighthouse report status:', error);
      throw new Error('Failed to update Lighthouse report status');
    }

    console.log('Lighthouse report updated: ', data);

    const { insertData, error: insertError } = await supabase.from("lighthouse_results").insert([
      {
        relation_id: process.env.TRACE_ID,
        html_report_url: `https://${getS3Config().bucketName}.s3.amazonaws.com/${htmlKey}`,
        json_report_url: `https://${getS3Config().bucketName}.s3.amazonaws.com/${jsonKey}`,
      }
    ]).select();

    console.log('insert result:', {
      insertData,
      error: insertError,
    });

    if (insertError) {
      console.error('Error inserting Lighthouse report into Supabase:', error);
      throw new Error('Failed to insert Lighthouse report into Supabase');
    }

    console.log('Reports uploaded to S3:', { htmlKey, jsonKey });
  }
}

export default LighthouseWorker;
