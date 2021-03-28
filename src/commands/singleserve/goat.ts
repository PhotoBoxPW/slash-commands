import { SlashCreator } from 'slash-create';
import APICommand from '../../apiCommand';

export default class Goat extends APICommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'goat',
      url: 'https://hi.snaz.in/api/v1/goat/random.json',
      credit: 'hi.snaz.in',
      emoji: '🐐'
    });
  }
}
