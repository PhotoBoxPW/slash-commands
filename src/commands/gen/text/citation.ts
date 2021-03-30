import { CommandContext, CommandOptionType, SlashCreator } from 'slash-create';
import { GenerationCommand } from '../../../imgsrv/abstracts';
import { CitationPayload } from '../../../imgsrv/payload';

export default class Citation extends GenerationCommand {
  endpoint = 'citation';
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'citation',
      description: 'I love a good Papers Please reference.',
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
          description: 'The text above the citation body.'
        },
        {
          name: 'footer',
          type: CommandOptionType.STRING,
          description: 'The text below the citation body.'
        }
      ]
    });
  }

  async run(ctx: CommandContext) {
    const payload: CitationPayload = {
      text: ctx.options.text as string
    };

    if (ctx.options.header) payload.header = ctx.options.header as string;
    if (ctx.options.footer) payload.footer = ctx.options.footer as string;

    return this.generate(ctx, payload);
  }
}
