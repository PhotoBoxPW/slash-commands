import { SlashCreator } from 'slash-create';
import { ImageCommand } from '../../../imgsrv/abstracts';

export default class RIP extends ImageCommand {
  endpoint = 'rip';
  constructor(creator: SlashCreator) {
    super(creator, 'rip', 'R.I.P.: Now with a tombstone.');
  }
}
