import {
  ApplicationCommandOption,
  CommandContext,
  CommandOptionType,
  SlashCommand,
  SlashCommandOptions,
  SlashCreator,
  User
} from 'slash-create';
import { oneLine } from 'common-tags';
import prettyMilliseconds from 'pretty-ms';
import {
  DoubleImagePayload,
  ImagePayload,
  ImgSrvPayload,
  TextPayload,
  UserPayload,
  WantedPayload
} from '../imgsrv/payload';
import { logger } from '../logger';
import { generate } from '../imgsrv';
import { find } from '../media';

export abstract class GenerationCommand extends SlashCommand {
  endpoint = '';

  constructor(creator: SlashCreator, opts: SlashCommandOptions) {
    super(creator, {
      throttling: {
        usages: 1,
        duration: 5
      },
      ...opts
    });
  }

  async generate(ctx: CommandContext, payload: ImgSrvPayload) {
    if (!this.endpoint) return 'No endpoint was defined for this command.';

    await ctx.defer(false);
    try {
      logger.info(oneLine`
        Generating '${this.endpoint}' for
        ${ctx.user.username}#${ctx.user.discriminator} (${ctx.user.id})
      `);
      const before = Date.now();
      const image = await generate(this.endpoint, payload);
      const after = Date.now();
      const diff = after - before;
      logger.info(oneLine`
        '${this.endpoint}' for
        ${ctx.user.username}#${ctx.user.discriminator} (${ctx.user.id})
        took ${prettyMilliseconds(diff)}
      `);
      return {
        file: { file: image.buffer, name: `${this.endpoint}.${image.extension}` },
        content: `Took ${prettyMilliseconds(after - before)} to render.`
      };
    } catch (err) {
      logger.error(
        oneLine`
          '${this.endpoint}' for
          ${ctx.user.username}#${ctx.user.discriminator} (${ctx.user.id})
          errored
        `,
        err
      );
      return {
        ephemeral: true,
        content: err.message
      };
    }
  }
}

export abstract class ImageCommand extends GenerationCommand {
  constructor(creator: SlashCreator, name: string, description: string, guildIDs?: string | string[]) {
    super(creator, {
      name,
      description,
      guildIDs,
      options: [
        {
          name: 'media',
          type: CommandOptionType.STRING,
          description: 'Can be a URL or an emoji. Use the "avatar" option to get an avatar.'
        },
        {
          name: 'avatar',
          type: CommandOptionType.USER,
          description: 'Use the avatar of the given user, defaults to your avatar.'
        }
      ]
    });
  }

  async run(ctx: CommandContext) {
    const user = ctx.users.first() || ctx.user;
    const media = ctx.options.media as string;

    const result = await find(user, media);
    const payload: ImagePayload = { image: result.url };

    return this.generate(ctx, payload);
  }
}

export abstract class TextCommand extends GenerationCommand {
  constructor(creator: SlashCreator, name: string, description: string, guildIDs?: string | string[]) {
    super(creator, {
      name,
      description,
      guildIDs,
      options: [
        {
          name: 'text',
          type: CommandOptionType.STRING,
          description: 'The text to use in this command.',
          required: true
        }
      ]
    });
  }

  async run(ctx: CommandContext) {
    const payload: TextPayload = { text: ctx.options.text as string };
    return this.generate(ctx, payload);
  }
}

export abstract class UserCommand extends GenerationCommand {
  usingText: boolean;

  constructor(creator: SlashCreator, name: string, description: string, usingText = true) {
    const options: ApplicationCommandOption[] = [
      {
        name: 'user',
        type: CommandOptionType.USER,
        description: 'The user to use in this command.'
      }
    ];
    if (usingText)
      options.unshift({
        name: 'text',
        type: CommandOptionType.STRING,
        description: 'The text to use in this command.',
        required: true
      });
    super(creator, { name, description, options });
    this.usingText = usingText;
  }

  async run(ctx: CommandContext) {
    const user = ctx.users.first() || ctx.user;

    const payload: UserPayload | WantedPayload = this.usingText
      ? {
          username: user.username,
          avatar: user.dynamicAvatarURL(),
          text: ctx.options.text as string
        }
      : {
          username: user.username,
          image: user.dynamicAvatarURL()
        };

    return this.generate(ctx, payload);
  }
}

export abstract class DoubleUserCommand extends GenerationCommand {
  constructor(creator: SlashCreator, name: string, description: string) {
    super(creator, {
      name,
      description,
      options: [
        {
          name: 'first_user',
          type: CommandOptionType.USER,
          description: 'The first user for the image.',
          required: true
        },
        {
          name: 'second_user',
          type: CommandOptionType.USER,
          description: 'The second user for this image.'
        }
      ]
    });
  }

  async run(ctx: CommandContext) {
    const users: User[] = [ctx.users.get(ctx.options.first_user as string)!];

    if (ctx.options.second_user) users.push(ctx.users.get(ctx.options.second_user as string)!);
    else users.unshift(ctx.user);

    const payload: DoubleImagePayload = {
      avatar1: users[0].dynamicAvatarURL(),
      avatar2: users[1].dynamicAvatarURL()
    };

    return this.generate(ctx, payload);
  }
}
