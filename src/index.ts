import { SlashCreator, FastifyServer } from 'slash-create';
import path from 'path';
import dotenv from 'dotenv';
import { loadExtractors } from './media';
import { cacheCommands } from './util';

let dotenvPath = path.join(process.cwd(), '.env');
if (path.parse(process.cwd()).name === 'dist') dotenvPath = path.join(process.cwd(), '..', '.env');

dotenv.config({ path: dotenvPath });

import { logger } from './logger';
import { start } from './imgsrv';

const creator = new SlashCreator({
  applicationID: process.env.DISCORD_APP_ID,
  publicKey: process.env.DISCORD_PUBLIC_KEY,
  token: process.env.DISCORD_BOT_TOKEN,
  serverPort: 8020,
  defaultImageFormat: 'png',
  defaultImageSize: 256
});

creator
  .on('debug', (message) => logger.log(message))
  .on('warn', (message) => logger.warn(message))
  .on('error', (error) => logger.error(error))
  .on('synced', () => logger.info(`${creator.commands.size.toLocaleString()} commands synced!`))
  .on('commandRun', (command, _, ctx) =>
    logger.info(`${ctx.user.username}#${ctx.user.discriminator} (${ctx.user.id}) ran command ${command.commandName}`)
  )
  .on('commandRegister', (command) => logger.info(`Registered command ${command.commandName}`))
  .on('commandError', (command, error) => logger.error(`Command ${command.commandName}:`, error));

start()
  .then(() => loadExtractors())
  .then(() => {
    creator.withServer(new FastifyServer()).registerCommandsIn(path.join(__dirname, 'commands'));

    if (cacheCommands(creator)) {
      logger.info('Cache updated, syncing...');
      creator.syncCommands();
    }

    if (process.env.TEST_GUILD) {
      const alreadySynced = !!creator.commands.find(
        (command) => command.guildIDs && command.guildIDs.includes(process.env.TEST_GUILD)
      );

      if (!alreadySynced)
        creator
          .syncCommandsIn(process.env.TEST_GUILD)
          .then(() => logger.info(`Synced test guild!`))
          .catch((e) => logger.error(`Failed to sync test guild!`, e));
    }

    creator.startServer();
  });

// This should serve in localhost:8020/interactions
