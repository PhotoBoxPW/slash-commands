import { SlashCreator } from 'slash-create';
import APICommand from '../../apiCommand';

export default class Snake extends APICommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'snake',
      url: 'https://hi.snaz.in/api/v1/snek/random.json',
      credit: 'hi.snaz.in',
      emoji: '🐍'
    });
  }
}
