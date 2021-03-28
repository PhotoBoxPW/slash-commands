import { SlashCreator } from 'slash-create';
import APICommand from '../../apiCommand';

export default class Hug extends APICommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'hug',
      description: '*hug*',
      url: 'https://some-random-api.ml/animu/hug',
      credit: 'some-random-api.ml'
    });
  }
}
