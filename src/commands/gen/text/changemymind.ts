import { SlashCreator } from 'slash-create';
import { TextCommand } from '../../../imgsrv/abstracts';

export default class CMM extends TextCommand {
  endpoint = 'changemymind';
  constructor(creator: SlashCreator) {
    super(creator, 'changemymind', 'Convince me.');
  }
}
