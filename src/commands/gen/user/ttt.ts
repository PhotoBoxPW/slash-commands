import { SlashCreator } from 'slash-create';
import { UserCommand } from '../../../imgsrv/abstracts';

export default class TTT extends UserCommand {
  endpoint = 'ttt';
  constructor(creator: SlashCreator) {
    super(creator, 'ttt', 'There is a traitor amongst us.');
  }
}
