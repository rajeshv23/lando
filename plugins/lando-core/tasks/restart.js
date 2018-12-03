'use strict';

const path = require('path');
const utils = require('./../lib/utils');

module.exports = lando => {
  const _ = lando.node._;
  const chalk = lando.node.chalk;
  const table = lando.cli.makeTable();
  return {
    command: 'restart',
    describe: 'Restarts your app',
    run: options => {
      // Try to get our app
      const app = lando.getApp(path.resolve(process.cwd(), lando.config.landoFile));
      console.log(chalk.green('Stopping your app... just so we can start it up again ¯\\_(ツ)_/¯'));
      // Restart it if we can!
      if (app) {
        return app.restart().then(() => {
          // Header it
          console.log(lando.cli.makeArt());
          // Inject start table into the table
          _.forEach(utils.startTable(app), (value, key) => {
            const opts = (_.includes(key, 'urls')) ? {arrayJoiner: '\n'} : {};
            table.add(_.toUpper(key), value, opts);
          });
          // Print the table
          console.log(table.toString());
          console.log('');
        });
      }
    },
  };
};