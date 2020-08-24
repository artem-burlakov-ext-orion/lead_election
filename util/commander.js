require('dotenv').config();
const program = require('commander');

const nodeStarter = require('../app');

const argParser = () => {
  program
    .version('1.0.0')
    .description('start new node')
    .option('-i, --id <nodeId>', 'node id in config.json')
    .action(() => nodeStarter(program.id)) 
    .parse(process.argv);
};

module.exports = argParser;
