import { SlashCreator } from 'slash-create';
import APICommand from '../../apiCommand';

export default class Bird extends APICommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'bird',
      url: 'https://shibe.online/api/birds?count=1',
      credit: 'shibe.online',
      emoji: '🐦'
    });
  }
}
