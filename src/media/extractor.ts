export default class Extractor {
  name = this.constructor.name;
  regex: RegExp | null = null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async extract(match: RegExpMatchArray, url: string): Promise<string | void> {}

  clearCache() {}
}
