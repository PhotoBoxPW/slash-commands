import { SlashCreator } from 'slash-create';
import { ImageCommand } from '../../../imgsrv/abstracts';

export default class ScreamingBaby extends ImageCommand {
  endpoint = 'screamingbaby';
  constructor(creator: SlashCreator) {
    super(creator, 'screamingbaby', 'Stop feeding the rabbit!');
  }
}
