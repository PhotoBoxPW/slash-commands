import { SlashCreator } from 'slash-create';
import { ImageCommand } from '../../../imgsrv/abstracts';

export default class Jail extends ImageCommand {
  endpoint = 'jail';
  constructor(creator: SlashCreator) {
    super(creator, 'jail', 'Put something in jail.');
  }
}
