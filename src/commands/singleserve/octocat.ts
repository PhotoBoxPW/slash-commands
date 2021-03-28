import { SlashCreator } from 'slash-create';
import APICommand from '../../apiCommand';

export default class Octocat extends APICommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'octocat',
      description: 'Get a random GitHub octocat.',
      url: 'https://hi.snaz.in/api/v1/octodex/random.json',
      credit: 'hi.snaz.in & octodex.github.com'
    });
  }
}
