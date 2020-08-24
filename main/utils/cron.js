require('dotenv').config();
const { CronJob } = require('cron');

const moveToCron = (func) => {
  const job = new CronJob(`*/${process.env.CHECK_PERIOD_IN_SECONDS} * * * * *`, func);
  job.start();
  console.log('JOB RUNNING', job.running());
}

module.exports = moveToCron;
