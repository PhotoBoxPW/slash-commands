import { SlashCreator } from 'slash-create';
import APICommand from '../../apiCommand';

export default class Wink extends APICommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'wink',
      description: '*wink*',
      url: 'https://some-random-api.ml/animu/wink',
      credit: 'some-random-api.ml'
    });
  }
}
