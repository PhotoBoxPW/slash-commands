import { SlashCreator } from 'slash-create';
import { TextCommand } from '../../../imgsrv/abstracts';

export default class Armor extends TextCommand {
  endpoint = 'armor';
  constructor(creator: SlashCreator) {
    super(creator, 'armor', 'He had no emotional armor.');
  }
}
