import { SlashCreator, FastifyServer } from 'slash-create';
import path from 'path';
import dotenv from 'dotenv';
import CatLoggr from 'cat-loggr/ts';

let dotenvPath = path.join(process.cwd(), '.env');
if (path.parse(process.cwd()).name === 'dist') dotenvPath = path.join(process.cwd(), '..', '.env');

dotenv.config({ path: dotenvPath });

const logger = new CatLoggr().setLevel(process.env.COMMANDS_DEBUG === 'true' ? 'debug' : 'info');
const creator = new SlashCreator({
  applicationID: process.env.DISCORD_APP_ID,
  publicKey: process.env.DISCORD_PUBLIC_KEY,
  token: process.env.DISCORD_BOT_TOKEN,
  serverPort: 8020
});

creator
  .on('debug', (message) => logger.log(message))
  .on('warn', (message) => logger.warn(message))
  .on('error', (error) => logger.error(error))
  .on('synced', () => logger.info('Commands synced!'))
  .on('commandRun', (command, _, ctx) =>
    logger.info(`${ctx.user.username}#${ctx.user.discriminator} (${ctx.user.id}) ran command ${command.commandName}`)
  )
  .on('commandRegister', (command) => logger.info(`Registered command ${command.commandName}`))
  .on('commandError', (command, error) => logger.error(`Command ${command.commandName}:`, error));

creator
  .withServer(new FastifyServer())
  .registerCommandsIn(path.join(__dirname, 'commands'))
  .syncCommands()
  .startServer();

// This should serve in localhost:8020/interactions
