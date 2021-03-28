import { SlashCreator } from 'slash-create';
import APICommand from '../../apiCommand';

export default class RedPanda extends APICommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'redpanda',
      description: 'Get a random red panda.',
      url: 'https://some-random-api.ml/img/red_panda',
      credit: 'some-random-api.ml'
    });
  }
}
