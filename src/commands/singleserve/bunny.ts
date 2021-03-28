import { SlashCreator } from 'slash-create';
import APICommand from '../../apiCommand';

export default class Bunny extends APICommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'bunny',
      url: 'https://hi.snaz.in/api/v1/bunnies/random.json',
      credit: 'hi.snaz.in & bunnies.media',
      emoji: '🐰'
    });
  }
}
