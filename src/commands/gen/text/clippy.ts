import { SlashCreator } from 'slash-create';
import { TextCommand } from '../../../imgsrv/abstracts';

export default class Clippy extends TextCommand {
  endpoint = 'clippy';
  constructor(creator: SlashCreator) {
    super(creator, 'clippy', 'Need any help?');
  }
}
