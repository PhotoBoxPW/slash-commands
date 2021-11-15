import { ApplicationCommandOption, CommandContext, CommandOptionType, SlashCreator } from 'slash-create';
import { GenerationCommand } from '../../../imgsrv/abstracts';
import { BlurplePayload } from '../../../imgsrv/payload';
import { find } from '../../../media';

const filterOptions: ApplicationCommandOption[] = [
  {
    name: 'media',
    type: CommandOptionType.STRING,
    description: 'Can be a URL or an emoji. Use the "avatar" option to get an avatar.'
  },
  {
    name: 'avatar',
    type: CommandOptionType.USER,
    description: 'Use the avatar of the given user, defaults to the last posted image.'
  },
  {
    name: 'gif',
    type: CommandOptionType.BOOLEAN,
    description: 'Whether to export a GIF in this filter.'
  }
];

export default class Duotone extends GenerationCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'duotone',
      description: 'Use a duotone filter on an image.',
      options: [
        {
          name: 'blurple',
          type: CommandOptionType.SUB_COMMAND,
          description: 'Blurpify things!',
          options: [
            ...filterOptions,
            {
              name: 'new_color',
              type: CommandOptionType.BOOLEAN,
              description: 'Whether to use the new blurple color in the filter.'
            }
          ]
        },
        {
          name: 'fireengine',
          type: CommandOptionType.SUB_COMMAND,
          description: 'Mixing the fire.',
          options: filterOptions
        },
        {
          name: 'honeyglow',
          type: CommandOptionType.SUB_COMMAND,
          description: 'Sweet honey.',
          options: filterOptions
        },
        {
          name: 'mtndew',
          type: CommandOptionType.SUB_COMMAND,
          description: 'Do the dew.',
          options: filterOptions
        }
      ],
      throttling: {
        usages: 1,
        duration: 10
      }
    });
  }

  async run(ctx: CommandContext) {
    const endpoint = ctx.subcommands[0];

    const user = ctx.users.first() || ctx.user;
    const media = ctx.options.media as string;

    const result = await find(user, media, ctx, ctx.users.size === 1);
    const payload: BlurplePayload = { image: result.url };

    // Define special options
    if (ctx.options.blurple?.new_color) payload.new_color = true;

    return this.generate(ctx, payload, endpoint);
  }
}
