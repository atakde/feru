import LighthouseWorker from  './lighthouse-worker.js';

const worker = new LighthouseWorker();
worker.run().catch(err => {
  console.error('Error running Lighthouse:', err);
  process.exit(1);
});
