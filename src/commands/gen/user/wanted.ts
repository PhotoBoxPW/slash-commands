import { SlashCreator } from 'slash-create';
import { UserCommand } from '../../../imgsrv/abstracts';

export default class Wanted extends UserCommand {
  endpoint = 'wanted';
  constructor(creator: SlashCreator) {
    super(creator, 'wanted', 'On the run.', false);
  }
}
