import emojilib from 'emojilib';
import path from 'path';
import Extractor from './extractor';
import { iterateFolder } from '../util';
import { User } from 'slash-create';

export const CUSTOM_EMOJI_REGEX = /<(a?):([0-9a-zA-Z-_]+):(\d+)>/;
export const URL_REGEX = /https?:\/\/[^\s<|]+[^<.,:;"')\]\s>|*_~`]/i;

export interface FindMediaResult {
  url: string;
  from: string;
  past?: boolean;
}

export let extractors: Extractor[] = [];

export async function loadExtractors() {
  const exts = await iterateFolder(path.join(__dirname, 'extractors'), (file) => {
    let extractor = require(file);
    if (typeof extractor === 'function') extractor = new extractor();
    else if (typeof extractor.default === 'function') extractor = new extractor.default();
    if (extractor.regex && extractor.extract) return extractor;
    return null;
  });

  extractors = exts.filter((e: any) => !!e);
}

export function toCodePoint(unicodeSurrogates: string, sep = '-') {
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

export async function parseURL(url: string) {
  if (!url) return null;
  if (!extractors.length) await loadExtractors();
  for (const extractor of extractors) {
    const match = url.match(extractor.regex!);
    if (match) {
      try {
        const result = await extractor.extract(match, url);
        if (result) return result;
      } catch (e) {}
    }
  }

  return null;
}

export function clearCache() {
  if (!extractors.length) return;
  for (const extractor of extractors) extractor.clearCache();
}

export async function find(user: User, media?: string): Promise<FindMediaResult> {
  if (media) {
    // URL detection
    if (URL_REGEX.test(media)) {
      const targetURL = media.match(URL_REGEX)![1];
      const convertedURL = targetURL ? (await this.parseURL(targetURL)) || targetURL : targetURL;
      if (targetURL)
        return {
          url: convertedURL,
          from: 'url'
        };
    }

    // Custom Emoji
    if (CUSTOM_EMOJI_REGEX.test(media)) {
      const match = media.match(CUSTOM_EMOJI_REGEX)!;
      return {
        url: `https://cdn.discordapp.com/emojis/${match[3]}.${match[1] ? 'gif' : 'png'}?size=128`,
        from: 'customEmoji'
      };
    }
    // Emoji (Longer length emojis get priority)
    const emojiMatches = Object.keys(emojilib)
      .filter((emoji) => media.startsWith(emoji))
      .sort((a, b) => a.length - b.length)
      .reverse();
    if (emojiMatches.length)
      return {
        url: `https://twemoji.maxcdn.com/v/latest/svg/${this.toCodePoint(emojiMatches[0])}.svg`,
        from: 'emoji'
      };
  }

  // User's Avatar
  return {
    url: user.dynamicAvatarURL(user.avatar?.startsWith('a_') ? 'gif' : 'png', 1024),
    from: 'user'
  };
}
