import * as path from 'path';
import * as fs from 'fs';

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
