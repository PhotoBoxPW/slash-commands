import { SlashCreator } from 'slash-create';
import { ImageCommand } from '../../../imgsrv/abstracts';

export default class WhoDidThis extends ImageCommand {
  endpoint = 'whodidthis';
  constructor(creator: SlashCreator) {
    super(creator, 'whodidthis', 'instagram memes');
  }
}
