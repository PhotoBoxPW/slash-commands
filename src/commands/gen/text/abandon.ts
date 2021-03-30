import { SlashCreator } from 'slash-create';
import { TextCommand } from '../../../imgsrv/abstracts';

export default class Abandon extends TextCommand {
  endpoint = 'abandon';
  constructor(creator: SlashCreator) {
    super(creator, 'abandon', 'Oh no.');
  }
}
