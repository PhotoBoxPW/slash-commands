import { SlashCreator } from 'slash-create';
import APICommand from '../../apiCommand';

export default class Shibe extends APICommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'shibe',
      url: 'https://shibe.online/api/shibes?count=1',
      credit: 'shibe.online',
      emoji: '🐕'
    });
  }
}
