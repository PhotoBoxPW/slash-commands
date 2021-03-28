import { SlashCreator } from 'slash-create';
import APICommand from '../../apiCommand';

export default class Coffee extends APICommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'coffee',
      description: 'Get coffee. ☕',
      url: 'https://coffee.alexflipnote.dev/random.json',
      credit: 'coffee.alexflipnote.dev'
    });
  }
}
