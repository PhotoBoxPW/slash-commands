import { SlashCreator } from 'slash-create';
import { ImageCommand } from '../../../imgsrv/abstracts';

export default class Linus extends ImageCommand {
  endpoint = 'clint';
  constructor(creator: SlashCreator) {
    super(creator, 'clint', 'Uh...');
  }
}
