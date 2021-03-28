import { SlashCreator } from 'slash-create';
import APICommand from '../../apiCommand';

export default class Duck extends APICommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'duck',
      url: 'https://random-d.uk/api/v2/random?format=json',
      credit: 'random-d.uk',
      emoji: '🦆'
    });
  }
}
