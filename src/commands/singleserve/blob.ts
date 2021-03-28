import { SlashCreator } from 'slash-create';
import APICommand from '../../apiCommand';

export default class Blob extends APICommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'blob',
      description: 'Get a random blob emoji from blobs.gg.',
      url: 'https://hi.snaz.in/api/v1/blobs/random.json',
      credit: 'hi.snaz.in & blobs.gg'
    });
  }
}
