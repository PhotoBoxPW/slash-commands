import { SlashCreator } from 'slash-create';
import { ImageCommand } from '../../../imgsrv/abstracts';

export default class Nickelback extends ImageCommand {
  endpoint = 'nickelback';
  constructor(creator: SlashCreator) {
    super(creator, 'nickelback', 'Everytime it makes me laugh.');
  }
}
