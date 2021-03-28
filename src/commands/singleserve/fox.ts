import { SlashCreator } from 'slash-create';
import APICommand from '../../apiCommand';

export default class Fox extends APICommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'fox',
      url: 'https://randomfox.ca/floof/',
      credit: 'randomfox.ca',
      emoji: '🦊'
    });
  }
}
