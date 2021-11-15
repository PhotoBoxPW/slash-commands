import { SlashCreator } from 'slash-create';
import { ImageCommand } from '../../../imgsrv/abstracts';

export default class Dissector extends ImageCommand {
  endpoint = 'dissector';
  constructor(creator: SlashCreator) {
    super(creator, 'dissector', 'Oh god...');
  }
}
