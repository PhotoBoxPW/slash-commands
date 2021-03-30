import { SlashCreator } from 'slash-create';
import { TextCommand } from '../../../imgsrv/abstracts';

export default class OkByeMom extends TextCommand {
  endpoint = 'okbyemom';
  constructor(creator: SlashCreator) {
    super(creator, 'okbyemom', "She's just going to the store for a bit.");
  }
}
