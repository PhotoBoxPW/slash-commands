import { SlashCreator } from 'slash-create';
import { ImageCommand } from '../../../imgsrv/abstracts';

export default class Art extends ImageCommand {
  endpoint = 'art';
  constructor(creator: SlashCreator) {
    super(creator, 'art', 'Stan from Gravity Falls calls you art.');
  }
}
