import { SlashCreator } from 'slash-create';
import { ImageCommand } from '../../../imgsrv/abstracts';

export default class Durv extends ImageCommand {
  endpoint = 'durv';
  constructor(creator: SlashCreator) {
    super(creator, 'durv', 'Wanna join my free giftcard giveaway?');
  }
}
