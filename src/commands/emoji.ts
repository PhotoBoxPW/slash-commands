import {
  SlashCommand,
  CommandOptionType,
  SlashCreator,
  CommandContext,
  ComponentType,
  ButtonStyle
} from 'slash-create';
import { stripIndents } from 'common-tags';
import emojilib from 'emojilib';

const CUSTOM_EMOJI_REGEX = /<(a?):([0-9a-zA-Z-_]+):(\d+)>/;
interface ParseEmojiResult {
  preview_url: string;
  url: string;
  urls: { [format: string]: string };
  name: string;
  custom: boolean;
  animated: boolean;
  names?: string[];
}

export default class Emoji extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'emoji',
      description: 'Gets the image link of an emoji.',
      options: [
        {
          type: CommandOptionType.STRING,
          name: 'emoji',
          description: 'The emoji to get the URL of.',
          required: true
        }
      ]
    });
  }

  async run(ctx: CommandContext) {
    const emoji = this.parseEmoji(ctx.options.emoji as string);
    if (!emoji) return 'An invalid emoji was given!';

    const parts = Object.keys(emoji.urls).map((format) => `**[\`.${format.toUpperCase()}\`](${emoji.urls[format]})**`);

    return {
      embeds: [
        {
          author: {
            name: emoji.name,
            icon_url: emoji.preview_url
          },
          description: stripIndents`
            🔗  ${parts.join(' ')}
            ${emoji.names ? `🏷️ ${emoji.names.map((e) => `\`${e}\``).join(', ')}` : ''}
          `,
          thumbnail: { url: emoji.url }
        }
      ],
      components: [
        {
          type: ComponentType.ACTION_ROW,
          components: [
            {
              type: ComponentType.BUTTON,
              style: ButtonStyle.LINK,
              label: 'Open Emoji URL',
              url: emoji.url
            }
          ]
        }
      ]
    };
  }

  parseEmoji(str: string): ParseEmojiResult | null {
    if (str && CUSTOM_EMOJI_REGEX.test(str)) {
      const match = str.match(CUSTOM_EMOJI_REGEX)!;
      const baseURL = `https://cdn.discordapp.com/emojis/${match[3]}.`;
      let urls: { [format: string]: string } = {
        png: baseURL + 'png?size=128',
        jpeg: baseURL + 'jpeg?size=128',
        webp: baseURL + 'webp?size=128'
      };
      if (match[1])
        urls = {
          gif: baseURL + 'gif?size=128',
          ...urls
        };
      return {
        name: match[2],
        preview_url: baseURL + 'png?size=128',
        url: baseURL + `${match[1] ? 'gif' : 'png'}?size=128`,
        urls,
        custom: true,
        animated: !!match[1]
      };
    }

    const emojiMatches = Object.keys(emojilib)
      .filter((emoji) => str.startsWith(emoji))
      .sort((a, b) => a.length - b.length)
      .reverse();
    if (emojiMatches.length) {
      const rawEmoji = emojiMatches[0];
      const names = (emojilib as any)[rawEmoji] as string[];
      const name = names.slice(0, 1)[0];
      const codepoint = this.toCodePoint(rawEmoji);

      return {
        name,
        names: names.slice(1),
        url: `https://twemoji.maxcdn.com/v/latest/72x72/${codepoint}.png`,
        preview_url: `https://twemoji.maxcdn.com/v/latest/72x72/${codepoint}.png`,
        urls: {
          svg: `https://twemoji.maxcdn.com/v/latest/svg/${codepoint}.svg`,
          png: `https://twemoji.maxcdn.com/v/latest/72x72/${codepoint}.png`
        },
        animated: false,
        custom: false
      };
    }

    return null;
  }

  toCodePoint(unicodeSurrogates: string, sep = '-') {
    var r = [],
      c = 0,
      p = 0,
      i = 0;
    while (i < unicodeSurrogates.length) {
      c = unicodeSurrogates.charCodeAt(i++);
      if (p) {
        r.push((0x10000 + ((p - 0xd800) << 10) + (c - 0xdc00)).toString(16));
        p = 0;
      } else if ((0xd800 <= c && c <= 0xdbff) || (0xfe00 <= c && c <= 0xfe0f)) {
        p = c;
      } else {
        r.push(c.toString(16));
      }
    }
    return r.join(sep);
  }
}
