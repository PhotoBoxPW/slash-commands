import { SlashCommand, CommandOptionType, SlashCreator, CommandContext } from 'slash-create';

export default class HTTPCat extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'httpcat',
      description: 'Get a cat based on an HTTP status code.',
      options: [
        {
          type: CommandOptionType.INTEGER,
          name: 'status_code',
          description: 'The status code you want a cat from.'
        }
      ]
    });
  }

  async run(ctx: CommandContext) {
    const code = ctx.options.status_code || 404;
    return {
      embeds: [
        {
          image: { url: `https://http.cat/${code}.jpg` },
          footer: { text: 'Powered by http.cat' }
        }
      ]
    };
  }
}
