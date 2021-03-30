import needle, { BodyData, NeedleOptions, NeedleResponse } from 'needle';
import { logger } from '../logger';
import { ImgSrvPayload } from './payload';

export enum ErrorCodes {
  SERVER_ERROR = -1,
  BAD_REQUEST = 0,
  MISSING_PARAMETER = 1,
  INVALID_IMAGE = 2
}

export interface ImageCacheObject {
  createdAt: number;
  bumps: number;
  extension: string;
  buffer: Buffer;
}

// #region error stuff
export interface ImgSrvErrorResponse {
  code: ErrorCodes;
  error: string;
  status: number;
  param?: string;
}

export const DEFAULT_MESSAGES: {
  [code: number]: (response: ImgSrvErrorResponse) => string;
} = {
  [ErrorCodes.SERVER_ERROR]: (response) => {
    logger.error('Error while generating [SERVER_ERROR]:', response.error);
    return 'An error happened while generating the image!';
  },
  [ErrorCodes.BAD_REQUEST]: (response) => {
    logger.error('Error while generating [BAD_REQUEST]:', response.error);
    return 'An error happened while generating the image!';
  },
  [ErrorCodes.MISSING_PARAMETER]: (response) => {
    logger.error('A crucial parameter is missing! [MISSING_PARAMETER]:', response.error);
    return 'An error happened while generating the image!';
  },
  [ErrorCodes.INVALID_IMAGE]: (response) => {
    return 'An error happened when using an image: ' + response.error;
  }
};

export class ImgSrvError extends Error {
  constructor(response: ImgSrvErrorResponse) {
    super(DEFAULT_MESSAGES[response.code](response));
  }
}

export class ImgSrvNeedleError extends Error {
  error?: Error;
  constructor(error?: Error) {
    super('An error happened while requesting to the image server!');
    this.error = error;
  }
}
// #endregion

export interface StatsResponse {
  [key: string]: {
    hits: number;
    avg_gen_time: number;
  };
}

export const imageCache = new Map<string, ImageCacheObject>();
export let cacheInterval: NodeJS.Timeout = null;

export async function start() {
  await ping();
  cacheInterval = setInterval(_interval, JSON.parse(process.env.IMGSRV_INTERVAL));
}

export async function stop() {
  clearInterval(cacheInterval!);
}

/** Pings the image server. */
export function ping() {
  return _get('/ping');
}

/** Gets the stats of the image server. */
export async function stats() {
  return (await _get('/stats')).body as StatsResponse;
}

/**
 * Generate something.
 * @param endpoint The endpoint to generate
 * @param payload The payload to use
 */
export async function generate(endpoint: string, payload: ImgSrvPayload) {
  const key = _genKey(endpoint, payload);
  if (imageCache.has(key)) {
    _bumpCache(key);
    return imageCache.get(key)!;
  }

  let image: NeedleResponse;
  try {
    image = await gen(endpoint, payload);
  } catch (e) {
    logger.error('Error while requesting to image server:', e);
    throw new ImgSrvNeedleError(e);
  }

  if (image.statusCode !== 200) throw new ImgSrvError(image.body);
  const extension = image.headers['content-type']!.split('/')[1];
  return _storeCache(key, extension, image.raw);
}

/**
 * Request a generating endpoint.
 * @param endpoint The endpoint to generate
 * @param payload The payload to use
 */
export function gen(endpoint: string, payload: ImgSrvPayload) {
  return _post(`/gen/${endpoint}`, payload, {
    headers: { Authorization: process.env.IMGSRV_KEY },
    json: true
  });
}

function _interval() {
  let deleted = 0;
  for (const key in this.imageCache) {
    const image = this.imageCache.get(key)!;
    if (image.createdAt + this.client.config.imgsrv.cacheTimeout < Date.now()) {
      deleted++;
      this.imageCache.delete(key);
    }
  }

  if (deleted) logger.log(`Cleared ${deleted.toLocaleString()} entries.`);
}

/** Generate keys in a nightmarish way. */
function _genKey(endpoint: string, payload: ImgSrvPayload) {
  let result = `[${endpoint}]`;
  const keyMap: { [key: string]: string } = {
    text: 't',
    texts: 'ts',
    challenge: 'c',
    header: 'h',
    footer: 'f',
    elim_by: 'eb',
    no_shadow: 'ns',
    username: 'u',
    avatar: 'a',
    image: 'i',
    allow_gif: 'ag',
    quality: 'l',
    mult: 'm',
    last_half: 'lh',
    avatar1: 'a1',
    avatar2: 'a2'
  };

  const DISCORD_ASSET_REGEX = /^https:\/\/cdn\.discordapp\.com\/([\w-]+)\/(\d+)\/([a-f0-9]{32})\.([a-z]{0,4})/;
  const DISCORD_ATTACHMENT_REGEX = /^https:\/\/cdn\.discordapp\.com\/attachments\/(\d+)\/(\d+)\/(\w+\.\w+)/;
  const DISCORD_EMOJI_REGEX = /^https:\/\/cdn\.discordapp\.com\/emojis\/(\d+)\.(png|gif)/;
  const TWEMOJI_REGEX = /^https:\/\/twemoji\.maxcdn\.com\/v\/latest\/svg\/(\w+)\.svg/;

  for (const initKey in payload) {
    const key = initKey as keyof ImgSrvPayload;
    result += key in keyMap ? keyMap[key] : key;
    result += '|';
    const value: any = payload[key];
    if (typeof value === 'boolean') result += value ? '1' : '0';
    if (typeof value === 'number') result += value.toString(36);
    if (typeof value === 'string') {
      if (DISCORD_ASSET_REGEX.test(value)) {
        const match = value.match(DISCORD_ASSET_REGEX)!;
        result +=
          `d/${match[1][0]}/${BigInt(match[2]).toString(36)}/` +
          `${BigInt('0x' + match[3]).toString(36)}/${match[4][0]}`;
      } else if (DISCORD_ATTACHMENT_REGEX.test(value)) {
        const match = value.match(DISCORD_ATTACHMENT_REGEX)!;
        result += `da/${BigInt(match[1]).toString(36)}/${BigInt(match[2]).toString(36)}/${match[3]}`;
      } else if (DISCORD_EMOJI_REGEX.test(value)) {
        const match = value.match(DISCORD_EMOJI_REGEX)!;
        result += `de/${BigInt(match[1]).toString(36)}/${match[2][0]}`;
      } else if (TWEMOJI_REGEX.test(value)) {
        const match = value.match(TWEMOJI_REGEX)!;
        result += `t/${match[1]}`;
      } else result += value;
    } else result += value.toString();
    result += '!';
  }

  return result;
}

function _bumpCache(key: string) {
  if (imageCache.has(key)) {
    const image = imageCache.get(key)!;
    image.createdAt = Date.now();
    image.bumps++;
    imageCache.set(key, image);
  }
}

function _storeCache(key: string, extension: string, buffer: Buffer) {
  if (imageCache.size >= JSON.parse(process.env.IMGSRV_LIMIT)) {
    const lastImage = Array.from(imageCache.entries()).sort(([, a], [, b]) => b.createdAt - a.createdAt)[0];
    imageCache.delete(lastImage[0]);
  }

  const imageObject: ImageCacheObject = {
    createdAt: Date.now(),
    bumps: 0,
    extension,
    buffer
  };
  imageCache.set(key, imageObject);
  return imageObject;
}

function _get(endpoint: string, options?: NeedleOptions) {
  return needle('get', process.env.IMGSRV_URL + endpoint, options);
}

function _post(endpoint: string, body: BodyData, options?: NeedleOptions) {
  return needle('post', process.env.IMGSRV_URL + endpoint, body, options);
}
