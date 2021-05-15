import { ApplicationCommandOption, CommandContext, CommandOptionType, SlashCommand, SlashCreator } from 'slash-create';
import { MessageOptions } from 'slash-create/lib/context';
import needle from 'needle';

interface SubcommandOptions {
  description?: string;
  url: string;
  emoji?: string;
  credit?: string;
  options?: ApplicationCommandOption[];
  headers?: Record<string, string>;
  messageObject?: (url: string, ctx: CommandContext) => MessageOptions;
  getImage?: (res: any) => string;
}

export default class Random extends SlashCommand {
  static subcommandMap: { [subcommand: string]: SubcommandOptions } = {
    '8ball': {
      url: 'https://hi.snaz.in/api/v1/eightball/random.json',
      description: 'Ask the mighty eight ball. 🎱',
      options: [
        {
          type: CommandOptionType.STRING,
          name: 'query',
          description: 'Whatever you want to tell the mighty eight ball.'
        }
      ]
    },
    bird: {
      url: 'https://shibe.online/api/birds?count=1',
      credit: 'shibe.online',
      emoji: '🐦'
    },
    blob: {
      description: 'Get a random blob emoji from blobs.gg.',
      url: 'https://hi.snaz.in/api/v1/blobs/random.json',
      credit: 'hi.snaz.in & blobs.gg'
    },
    bunny: {
      url: 'https://hi.snaz.in/api/v1/bunnies/random.json',
      credit: 'hi.snaz.in & bunnies.media',
      emoji: '🐰'
    },
    cat: {
      url: 'http://aws.random.cat/meow',
      credit: 'random.cat',
      emoji: '🐱'
    },
    coffee: {
      description: 'Get coffee. ☕',
      url: 'https://coffee.alexflipnote.dev/random.json',
      credit: 'coffee.alexflipnote.dev'
    },
    dog: {
      url: 'https://random.dog/woof.json',
      credit: 'random.dog',
      emoji: '🐶'
    },
    duck: {
      url: 'https://random-d.uk/api/v2/random?format=json',
      credit: 'random-d.uk',
      emoji: '🦆'
    },
    fox: {
      url: 'https://randomfox.ca/floof/',
      credit: 'randomfox.ca',
      emoji: '🦊'
    },
    goat: {
      url: 'https://hi.snaz.in/api/v1/goat/random.json',
      credit: 'hi.snaz.in',
      emoji: '🐐'
    },
    inspirational_quote: {
      description: 'Get a random inspirational quote.',
      url: 'https://inspirobot.me/api?generate=true',
      credit: 'inspirobot.me'
    },
    koala: {
      url: 'https://some-random-api.ml/img/koala',
      credit: 'some-random-api.ml',
      emoji: '🐨'
    },
    lizard: {
      url: 'https://nekos.life/api/v2/img/lizard',
      emoji: '🦎'
    },
    lucario: {
      description: 'Get a random picture of the pokémon Lucario.',
      url: 'http://pics.floofybot.moe/image?token=lucario&category=sfw'
    },
    octocat: {
      description: 'Get a random GitHub octocat.',
      url: 'https://hi.snaz.in/api/v1/octodex/random.json',
      credit: 'hi.snaz.in & octodex.github.com'
    },
    owl: {
      url: 'http://pics.floofybot.moe/owl',
      emoji: '🦉'
    },
    panda: {
      url: 'https://some-random-api.ml/img/panda',
      credit: 'some-random-api.ml',
      emoji: '🐼'
    },
    pikachu: {
      description: 'Get a random picture of the pokémon Pikachu.',
      url: 'https://some-random-api.ml/img/pikachu',
      credit: 'some-random-api.ml'
    },
    red_panda: {
      description: 'Get a random red panda.',
      url: 'https://some-random-api.ml/img/red_panda',
      credit: 'some-random-api.ml'
    },
    shibe: {
      url: 'https://shibe.online/api/shibes?count=1',
      credit: 'shibe.online',
      emoji: '🐕'
    },
    snake: {
      url: 'https://hi.snaz.in/api/v1/snek/random.json',
      credit: 'hi.snaz.in',
      emoji: '🐍'
    }
  };

  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'random',
      description: 'Get random images.',
      options: Object.keys(Random.subcommandMap).map((subcommandName) => {
        const opts = Random.subcommandMap[subcommandName];

        const subcommand = {
          type: CommandOptionType.SUB_COMMAND,
          name: subcommandName,
          description: opts.description || `Get a random ${subcommandName}.${opts.emoji ? ` ${opts.emoji}` : ''}`,
          options: opts.options || []
        };

        subcommand.options.push({
          type: CommandOptionType.BOOLEAN,
          name: 'hidden',
          description: 'Hide this message to others?'
        });

        return subcommand;
      })
    });
  }

  async run(ctx: CommandContext) {
    if (!ctx.subcommands[0] || !(ctx.subcommands[0] in Random.subcommandMap))
      return {
        content: "Couldn't find that subcommand!",
        ephemeral: true
      };

    // @ts-ignore
    const ephemeral = ctx.options[ctx.subcommands[0]].hidden || false;
    if (ephemeral) await ctx.defer(true);

    const subcommand = Random.subcommandMap[ctx.subcommands[0]];
    return this.runImage(ctx, subcommand);
  }

  async runImage(ctx: CommandContext, subcommand: SubcommandOptions) {
    try {
      const res = await needle('get', subcommand.url, {
        headers: subcommand.headers || {},
        open_timeout: 2000,
        response_timeout: 1000,
        read_timeout: 1000
      });
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const url = subcommand.getImage ? subcommand.getImage(res.body) : this.getImage(res.body);
        return subcommand.messageObject ? subcommand.messageObject(url, ctx) : this.messageObject(url, subcommand);
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

  messageObject(url: string, subcommand: SubcommandOptions) {
    return {
      embeds: [
        {
          image: { url },
          ...(subcommand.credit
            ? {
                footer: { text: `Powered by ${subcommand.credit}` }
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
