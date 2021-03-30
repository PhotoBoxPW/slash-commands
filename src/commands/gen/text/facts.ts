import { SlashCreator } from 'slash-create';
import { TextCommand } from '../../../imgsrv/abstracts';

export default class Facts extends TextCommand {
  endpoint = 'facts';
  constructor(creator: SlashCreator) {
    super(creator, 'facts', 'OnlyFacts.');
  }
}
