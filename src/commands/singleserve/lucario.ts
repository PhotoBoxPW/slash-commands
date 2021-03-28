import { SlashCreator } from 'slash-create';
import APICommand from '../../apiCommand';

export default class Lucario extends APICommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'lucario',
      description: 'Get a random picture of the pokémon Lucario.',
      url: 'http://pics.floofybot.moe/image?token=lucario&category=sfw'
    });
  }
}
