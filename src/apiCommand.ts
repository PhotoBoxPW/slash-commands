import { ApplicationCommandOption, CommandContext, SlashCommand, SlashCreator } from 'slash-create';
import needle from 'needle';

export interface APICommandOptions {
  name: string;
  description?: string;
  url: string;
  emoji?: string;
  credit?: string;
  guildID?: string | string[];
  options?: ApplicationCommandOption[];
}

export default abstract class APICommand extends SlashCommand {
  url: string = null;
  credit: string = null;

  constructor(creator: SlashCreator, opts: APICommandOptions) {
    super(creator, {
      name: opts.name,
      description: opts.description || `Get a random ${opts.name}.${opts.emoji ? ` ${opts.emoji}` : ''}`,
      guildIDs: opts.guildID,
      deferEphemeral: false,
      options: opts.options || []
    });

    this.url = opts.url;
    this.credit = opts.credit;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async run(ctx: CommandContext) {
    try {
      const res = await needle('get', this.url, {
        headers: this.headers,
        open_timeout: 2000,
        response_timeout: 1000,
        read_timeout: 1000
      });
      if (res.statusCode >= 200 && res.statusCode < 300) {
        return this.messageObject(this.getImage(res.body));
      } else
        return {
          content: `The service gave us a ${res.statusCode}! Try again later!`,
          ephemeral: true
        };
    } catch (e) {
      return {
        content: 'An error occurred with the API!',
        ephemeral: true
      };
    }
  }

  get headers(): Record<string, string> {
    return {};
  }

  messageObject(url: string) {
    return {
      embeds: [
        {
          image: { url },
          ...(this.credit
            ? {
                footer: { text: `Powered by ${this.credit}` }
              }
            : {})
        }
      ]
    };
  }

  getImage(res: any): string {
    return res.url || res.file || res.image || res.link || res.text || res[0];
  }
}
