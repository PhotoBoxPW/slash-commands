import { SlashCreator } from 'slash-create';
import { ImageCommand } from '../../../imgsrv/abstracts';

export default class Respects extends ImageCommand {
  endpoint = 'respects';
  constructor(creator: SlashCreator) {
    super(creator, 'respects', 'Press F to Pay Respects');
  }
}
