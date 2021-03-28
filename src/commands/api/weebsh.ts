import { SlashCommand, CommandOptionType, SlashCreator, CommandContext } from 'slash-create';
import needle from 'needle';

export default class WeebSh extends SlashCommand {
  types: string[] = null;

  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'weebsh',
      description: 'Utilizes the Weeb.sh API.',
      options: [
        {
          type: CommandOptionType.STRING,
          name: 'type',
          description: 'The type of image you want to get.',
          required: true
        }
      ],
      throttling: {
        usages: 1,
        duration: 2
      },
      deferEphemeral: false
    });

    this.preload();
  }

  get headers() {
    return {
      'User-Agent': `PhotoBoxSlashCommands/1.0.0/${process.env.COMMANDS_DEBUG ? 'test' : 'production'}`,
      Authorization: `Wolke ${process.env.WEEBSH_KEY}`
    };
  }

  async preload() {
    const typesResponse = await needle('get', 'https://api.weeb.sh/images/types', { headers: this.headers });
    if (typesResponse.statusCode === 200) this.types = typesResponse.body.types.sort();
  }

  async run(ctx: CommandContext) {
    if (!this.types.includes(ctx.options.type as string))
      return {
        ephemeral: true,
        content: 'Invalid type, specify a type from this list:\n' + this.types.map((type) => `\`${type}\``).join(', ')
      };
    else {
      const image = await needle('get', 'https://api.weeb.sh/images/random?type=' + ctx.options.type, {
        headers: this.headers
      });
      if (image.statusCode === 404) return `${ctx.user.mention}, Could not find any images with the query!`;
      return {
        embeds: [
          {
            image: { url: image.body.url },
            footer: { text: 'Powered by weeb.sh' }
          }
        ]
      };
    }
  }
}
