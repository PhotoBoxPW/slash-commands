import { SlashCreator } from 'slash-create';
import { DoubleUserCommand } from '../../../imgsrv/abstracts';

export default class Tinder extends DoubleUserCommand {
  endpoint = 'tinder';
  constructor(creator: SlashCreator) {
    super(creator, 'tinder', 'Hot date!');
  }
}
