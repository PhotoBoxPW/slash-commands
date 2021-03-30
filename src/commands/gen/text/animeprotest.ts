import { SlashCreator } from 'slash-create';
import { TextCommand } from '../../../imgsrv/abstracts';

export default class AnimeProtest extends TextCommand {
  endpoint = 'animeprotest';
  constructor(creator: SlashCreator) {
    super(creator, 'animeprotest', '3D women are NOT important!');
  }
}
