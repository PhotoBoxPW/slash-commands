import { SlashCreator } from 'slash-create';
import { ImageCommand } from '../../../imgsrv/abstracts';

export default class Linus extends ImageCommand {
  endpoint = 'linus';
  constructor(creator: SlashCreator) {
    super(creator, 'linus', "Here's a tech tip.");
  }
}
