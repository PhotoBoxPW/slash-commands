import { SlashCreator } from 'slash-create';
import APICommand from '../../apiCommand';

export default class Owl extends APICommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'owl',
      url: 'http://pics.floofybot.moe/owl',
      emoji: '🦉'
    });
  }
}
