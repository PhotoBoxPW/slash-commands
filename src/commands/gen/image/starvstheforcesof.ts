import { SlashCreator } from 'slash-create';
import { ImageCommand } from '../../../imgsrv/abstracts';

export default class SVTFO extends ImageCommand {
  endpoint = 'starvstheforcesof';
  constructor(creator: SlashCreator) {
    super(creator, 'starvstheforcesof', 'WHO DOES STAR FIGHT ON THE NEXT EPISODE?');
  }
}
