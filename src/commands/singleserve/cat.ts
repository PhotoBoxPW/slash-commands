import { SlashCreator } from 'slash-create';
import APICommand from '../../apiCommand';

export default class Cat extends APICommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'cat',
      url: 'http://aws.random.cat/meow',
      credit: 'random.cat',
      emoji: '🐱'
    });
  }
}
