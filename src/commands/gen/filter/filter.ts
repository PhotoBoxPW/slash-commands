import { ApplicationCommandOption, CommandContext, CommandOptionType, SlashCreator } from 'slash-create';
import { GenerationCommand } from '../../../imgsrv/abstracts';
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
  }
];

const gifFilterOptions: ApplicationCommandOption[] = [
  ...filterOptions,
  {
    name: 'gif',
    type: CommandOptionType.BOOLEAN,
    description: 'Whether to export a GIF in this filter.'
  }
];

const mirrorFilterOptions: ApplicationCommandOption[] = [
  ...gifFilterOptions,
  {
    name: 'lasthalf',
    type: CommandOptionType.BOOLEAN,
    description: 'Whether to use the last half when mirroring.'
  }
];

export default class Filter extends GenerationCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'filter',
      description: 'Use a filter on an image.',
      options: [
        {
          name: 'blur',
          type: CommandOptionType.SUB_COMMAND,
          description: 'Blur an image.',
          options: [
            ...gifFilterOptions,
            {
              name: 'radius',
              type: CommandOptionType.INTEGER,
              description: 'The radius of the blur.'
            }
          ]
        },
        {
          name: 'circlecrop',
          type: CommandOptionType.SUB_COMMAND,
          description: 'Crops an image into a circle.',
          options: gifFilterOptions
        },
        {
          name: 'deepfry',
          type: CommandOptionType.SUB_COMMAND,
          description: 'Ruin images.',
          options: filterOptions
        },
        {
          name: 'distort',
          type: CommandOptionType.SUB_COMMAND,
          description: 'You. Are. Art.',
          options: filterOptions
        },
        {
          name: 'flip',
          type: CommandOptionType.SUB_COMMAND,
          description: 'Flip an image horizontally.',
          options: gifFilterOptions
        },
        {
          name: 'flop',
          type: CommandOptionType.SUB_COMMAND,
          description: 'Flip an image vertically.',
          options: gifFilterOptions
        },
        {
          name: 'glitch',
          type: CommandOptionType.SUB_COMMAND,
          description: 'Glitch images.',
          options: filterOptions
        },
        {
          name: 'grayscale',
          type: CommandOptionType.SUB_COMMAND,
          description: 'Grayscale images.',
          options: gifFilterOptions
        },
        {
          name: 'invert',
          type: CommandOptionType.SUB_COMMAND,
          description: 'Invert images.',
          options: gifFilterOptions
        },
        {
          name: 'jpeg',
          type: CommandOptionType.SUB_COMMAND,
          description: "I don't know what a JPEG is.",
          options: filterOptions
        },
        {
          name: 'magik',
          type: CommandOptionType.SUB_COMMAND,
          description: 'Better than art.',
          options: filterOptions
        },
        {
          name: 'mirror',
          type: CommandOptionType.SUB_COMMAND,
          description: 'Mirror an image horizontally.',
          options: mirrorFilterOptions
        },
        {
          name: 'verticalmirror',
          type: CommandOptionType.SUB_COMMAND,
          description: 'Mirror an image vertically.',
          options: mirrorFilterOptions
        },
        {
          name: 'pixelsort',
          type: CommandOptionType.SUB_COMMAND,
          description: 'Sort pixels on an image.',
          options: gifFilterOptions
        },
        {
          name: 'sepia',
          type: CommandOptionType.SUB_COMMAND,
          description: 'Put a sepia filter on an image.',
          options: gifFilterOptions
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

    // Handle special options
    switch (endpoint) {
      case 'blur':
        if (ctx.options.blur.radius < 2)
          return {
            ephemeral: true,
            content: 'The blur radius cannot be less than 2!'
          };
        else if (ctx.options.blur.radius > 10)
          return {
            ephemeral: true,
            content: 'The blur radius cannot be larger than 10!'
          };
        break;
    }

    const user = ctx.users.first() || ctx.user;
    const media = ctx.options.media as string;

    const result = await find(user, media, ctx, ctx.users.size === 1);
    const payload: any = { image: result.url };

    // Define special options
    if (ctx.options.blur?.radius) payload.blur = ctx.options.blur.radius;
    if (ctx.options.mirror?.lasthalf || ctx.options.vmirror?.lasthalf) payload.last_half = true;

    return this.generate(ctx, payload, endpoint);
  }
}
