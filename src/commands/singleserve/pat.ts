import { SlashCreator } from 'slash-create';
import APICommand from '../../apiCommand';

export default class Pat extends APICommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'pat',
      description: '*pat*',
      url: 'https://some-random-api.ml/animu/pat',
      credit: 'some-random-api.ml'
    });
  }
}
