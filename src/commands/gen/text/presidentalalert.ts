import { SlashCreator } from 'slash-create';
import { TextCommand } from '../../../imgsrv/abstracts';

export default class PresidentialAlert extends TextCommand {
  endpoint = 'presidentialalert';
  constructor(creator: SlashCreator) {
    super(creator, 'presidentialalert', 'You thought it was an AMBER alert.');
  }
}
