import { CommandOptionType, SlashCreator, CommandContext } from 'slash-create';
import { GenerationCommand } from '../../imgsrv/abstracts';
import { ColorPayload } from '../../imgsrv/payload';
import { randint } from '../../util';

export class ColorCommand extends GenerationCommand {
  endpoint = 'color';
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'color',
      description: 'Display a color.',
      options: [
        {
          name: 'color',
          type: CommandOptionType.STRING,
          description: "The color to display. Can use HEX colors, web color names or 'random'.",
          required: true
        }
      ]
    });
  }

  async run(ctx: CommandContext) {
    let color = ctx.options.color as string;
    if (ctx.options.color === 'random' || ctx.options.color === 'r')
      color = '#' + randint(0, 16777215).toString(16).padEnd(6, '0');
    const payload: ColorPayload = { color };
    return this.generate(ctx, payload);
  }
}
