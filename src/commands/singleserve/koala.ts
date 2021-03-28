import { SlashCreator } from 'slash-create';
import APICommand from '../../apiCommand';

export default class Koala extends APICommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'koala',
      url: 'https://some-random-api.ml/img/koala',
      credit: 'some-random-api.ml',
      emoji: '🐨'
    });
  }
}
