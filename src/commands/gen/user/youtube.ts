import { SlashCreator } from 'slash-create';
import { UserCommand } from '../../../imgsrv/abstracts';

export default class YouTube extends UserCommand {
  endpoint = 'youtube';
  constructor(creator: SlashCreator) {
    super(creator, 'youtube', 'Lovely YouTube comment section.');
  }
}
