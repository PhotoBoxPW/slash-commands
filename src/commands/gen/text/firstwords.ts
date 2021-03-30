import { SlashCreator } from 'slash-create';
import { TextCommand } from '../../../imgsrv/abstracts';

export default class FirstWords extends TextCommand {
  endpoint = 'firstwords';
  constructor(creator: SlashCreator) {
    super(creator, 'firstwords', "He's about to say his first words!");
  }
}
