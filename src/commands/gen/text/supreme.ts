import { SlashCreator } from 'slash-create';
import { TextCommand } from '../../../imgsrv/abstracts';

export default class Supreme extends TextCommand {
  endpoint = 'supreme';
  constructor(creator: SlashCreator) {
    super(creator, 'supreme', 'This has already been sold out.');
  }
}
