import { SlashCreator } from 'slash-create';
import { TextCommand } from '../../../imgsrv/abstracts';

export default class NutButton extends TextCommand {
  endpoint = 'nutbutton';
  constructor(creator: SlashCreator) {
    super(creator, 'nutbutton', '🌰');
  }
}
