import * as path from 'path';
import * as fs from 'fs';
import { SlashCreator } from 'slash-create';

/**
 * Iterates through a folder and calls back on every .js found.
 * @param folder The path to check
 * @param callback The function to call on each file found
 * @param extension The extension to look for
 */
export async function iterateFolder(
  folder: string,
  callback: (path: string) => Promise<any>,
  extension = '.js'
): Promise<any> {
  const files = fs.readdirSync(folder);
  return Promise.all(
    files.map(async (file) => {
      const filePath = path.join(folder, file);
      const stat = fs.lstatSync(filePath);
      if (stat.isSymbolicLink()) {
        const realPath = fs.readlinkSync(filePath);
        if (stat.isFile() && file.endsWith(extension)) {
          return callback(realPath);
        } else if (stat.isDirectory()) {
          return iterateFolder(realPath, callback);
        }
      } else if (stat.isFile() && file.endsWith(extension)) return callback(filePath);
      else if (stat.isDirectory()) return iterateFolder(filePath, callback);
    })
  );
}

/**
 * Get a random integer.
 * @param min The minimum number
 * @param max The maximum number
 */
export function randint(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Caches commands to a file.
 * @param creator The creator to cache commands from
 * @returns Whether the cache has updated
 */
export function cacheCommands(creator: SlashCreator) {
  let cache = '';

  if (fs.existsSync('../.command_cache.json')) cache = fs.readFileSync('../.command_cache.json', { encoding: 'utf-8' });

  const currentCache = JSON.stringify(
    creator.commands.map((cmd) => ({
      ...cmd.commandJSON,
      guildIDs: cmd.guildIDs
    }))
  );

  if (cache === currentCache) return false;

  fs.writeFileSync('../.command_cache.json', currentCache);
  return true;
}
