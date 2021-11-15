import { SlashCreator } from 'slash-create';
import { ImageCommand } from '../../../imgsrv/abstracts';

export default class Shoot extends ImageCommand {
  endpoint = 'shoot';
  constructor(creator: SlashCreator) {
    super(creator, 'shoot', 'Take the shot.');
  }
}
