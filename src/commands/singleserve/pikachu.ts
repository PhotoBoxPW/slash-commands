import { SlashCreator } from 'slash-create';
import APICommand from '../../apiCommand';

export default class Pikachu extends APICommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'pikachu',
      description: 'Get a random picture of the pokémon Pikachu.',
      url: 'https://some-random-api.ml/img/pikachu',
      credit: 'some-random-api.ml'
    });
  }
}
