import { SlashCreator } from 'slash-create';
import { ImageCommand } from '../../../imgsrv/abstracts';

export default class Folder extends ImageCommand {
  endpoint = 'folder';
  constructor(creator: SlashCreator) {
    super(creator, 'folder', 'Whats in the folder?');
  }
}
