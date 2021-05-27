import { SlashCreator } from 'slash-create';
import { ImageCommand } from '../../../imgsrv/abstracts';

export default class SquidwardsTV extends ImageCommand {
  endpoint = 'squidwardstv';
  constructor(creator: SlashCreator) {
    super(creator, 'squidwardstv', 'No wait, Put that back on!');
  }
}
