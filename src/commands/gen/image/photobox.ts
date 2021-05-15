import { SlashCreator } from 'slash-create';
import { ImageCommand } from '../../../imgsrv/abstracts';

export default class PhotoBox extends ImageCommand {
  endpoint = 'photobox';
  constructor(creator: SlashCreator) {
    super(creator, 'photobox', 'Now this is meta.');
  }
}
