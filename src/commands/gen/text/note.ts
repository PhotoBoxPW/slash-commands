import { SlashCreator } from 'slash-create';
import { TextCommand } from '../../../imgsrv/abstracts';

export default class Note extends TextCommand {
  endpoint = 'note';
  constructor(creator: SlashCreator) {
    super(creator, 'note', 'Passing notes in class.');
  }
}
