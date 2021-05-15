import { SlashCreator } from 'slash-create';
import { ImageCommand } from '../../../imgsrv/abstracts';

export default class Waifu extends ImageCommand {
  endpoint = 'waifu';
  constructor(creator: SlashCreator) {
    super(creator, 'waifu', 'Use this if you think a waifu is trash.');
  }
}
