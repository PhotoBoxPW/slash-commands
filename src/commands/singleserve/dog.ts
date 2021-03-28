import { SlashCreator } from 'slash-create';
import APICommand from '../../apiCommand';

export default class Dog extends APICommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'dog',
      url: 'https://random.dog/woof.json',
      credit: 'random.dog',
      emoji: '🐶'
    });
  }
}
