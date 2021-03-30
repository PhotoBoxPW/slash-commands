import { SlashCreator } from 'slash-create';
import { TextCommand } from '../../../imgsrv/abstracts';

export default class BonziBuddy extends TextCommand {
  endpoint = 'bonzibuddy';
  constructor(creator: SlashCreator) {
    super(creator, 'bonzibuddy', 'Lets surf the internet together!');
  }
}
