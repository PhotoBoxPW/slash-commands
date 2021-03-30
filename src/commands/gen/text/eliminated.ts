import { CommandContext, CommandOptionType, SlashCreator } from 'slash-create';
import { GenerationCommand } from '../../../imgsrv/abstracts';
import { EliminatedPayload } from '../../../imgsrv/payload';

export default class Eliminated extends GenerationCommand {
  endpoint = 'eliminated';
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'eliminated',
      description: 'dont main bastion',
      options: [
        {
          name: 'text',
          type: CommandOptionType.STRING,
          description: 'The text to use in this command.',
          required: true
        },
        {
          name: 'eliminated_by',
          type: CommandOptionType.BOOLEAN,
          description: 'Whether to display like a death message rather than a kill message.'
        },
        {
          name: 'no_shadow',
          type: CommandOptionType.BOOLEAN,
          description: 'Whether to show the text with no shadow.'
        }
      ]
    });
  }

  async run(ctx: CommandContext) {
    const payload: EliminatedPayload = {
      text: ctx.options.text as string
    };

    if (ctx.options.eliminated_by) payload.elim_by = true;
    if (ctx.options.no_shadow) payload.no_shadow = true;

    return this.generate(ctx, payload);
  }
}
