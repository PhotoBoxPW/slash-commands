import { SlashCreator } from 'slash-create';
import APICommand from '../../apiCommand';

export default class Panda extends APICommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'panda',
      url: 'https://some-random-api.ml/img/panda',
      credit: 'some-random-api.ml',
      emoji: '🐼'
    });
  }
}
