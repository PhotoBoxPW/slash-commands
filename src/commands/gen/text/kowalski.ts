import { SlashCreator } from 'slash-create';
import { TextCommand } from '../../../imgsrv/abstracts';

export default class Kowalski extends TextCommand {
  endpoint = 'kowalski';
  constructor(creator: SlashCreator) {
    super(creator, 'kowalski', 'Smile and wave.');
  }
}
