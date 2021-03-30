import { SlashCreator } from 'slash-create';
import { TextCommand } from '../../../imgsrv/abstracts';

export default class Presentation extends TextCommand {
  endpoint = 'presentation';
  constructor(creator: SlashCreator) {
    super(creator, 'presentation', 'Presenting an opinion.');
  }
}
