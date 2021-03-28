import { SlashCreator } from 'slash-create';
import APICommand from '../../apiCommand';

export default class Lizard extends APICommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'lizard',
      url: 'https://nekos.life/api/v2/img/lizard',
      emoji: '🦎'
    });
  }
}
