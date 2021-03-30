import { CommandContext, CommandOptionType, SlashCreator } from 'slash-create';
import { GenerationCommand } from '../../../imgsrv/abstracts';
import { AchievementPayload } from '../../../imgsrv/payload';

export default class Achievement extends GenerationCommand {
  endpoint = 'achievement';
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'achievement',
      description: 'Achievement get!',
      options: [
        {
          name: 'text',
          type: CommandOptionType.STRING,
          description: 'The text to use in this command.',
          required: true
        },
        {
          name: 'header',
          type: CommandOptionType.STRING,
          description: 'The text above the achievement title.'
        },
        {
          name: 'challenge',
          type: CommandOptionType.BOOLEAN,
          description: 'Whether to use the challenge format of the achievement.'
        },
        {
          name: 'icon',
          type: CommandOptionType.STRING,
          description: 'The icon to use in the achievement.',
          choices: [
            // Image coords to the icons (x-y)
            { name: 'Crafting Table', value: '13-6' },
            { name: 'Furnace', value: '31-10' },
            { name: 'Chest', value: '4-5' },
            { name: 'Wooden Sign', value: '11-19' },
            { name: 'Ladder', value: '20-14' },
            { name: 'Cake', value: '19-4' },
            { name: 'Bow', value: '17-3' },
            { name: 'Book', value: '13-3' }
          ]
        }
      ]
    });
  }

  async run(ctx: CommandContext) {
    const payload: AchievementPayload = {
      text: ctx.options.text as string
    };

    if (ctx.options.header) payload.header = ctx.options.header as string;
    if (ctx.options.challenge) payload.challenge = true;
    if (typeof ctx.options.icon == 'string') {
      const [x, y] = ctx.options.icon.split('-');
      payload.icon_x = parseInt(x);
      payload.icon_y = parseInt(y);
    }

    return this.generate(ctx, payload);
  }
}
