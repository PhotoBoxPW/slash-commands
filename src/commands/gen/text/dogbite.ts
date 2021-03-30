import { SlashCreator } from 'slash-create';
import { TextCommand } from '../../../imgsrv/abstracts';

export default class DogBite extends TextCommand {
  endpoint = 'dogbite';
  constructor(creator: SlashCreator) {
    super(creator, 'dogbite', 'He hurts in other ways.');
  }
}
