import { SlashCreator } from 'slash-create';
import { ImageCommand } from '../../../imgsrv/abstracts';

export default class Garfield extends ImageCommand {
  endpoint = 'garfield';
  constructor(creator: SlashCreator) {
    super(creator, 'garfield', "Someone isn't allowed here.");
  }
}
