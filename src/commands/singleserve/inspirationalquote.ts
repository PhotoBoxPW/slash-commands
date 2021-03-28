import { SlashCreator } from 'slash-create';
import APICommand from '../../apiCommand';

export default class InspirationalQuote extends APICommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'inspirationalquote',
      description: 'Get a random inspirational quote.',
      url: 'https://inspirobot.me/api?generate=true',
      credit: 'inspirobot.me'
    });
  }
}
