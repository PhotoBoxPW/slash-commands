const { SlashCommand, CommandOptionType } = require('slash-create');

module.exports = class HTTPCatCommand extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'httpcat',
      description: 'Get a cat based on an HTTP status code.',
      options: [{
        type: CommandOptionType.INTEGER,
        name: 'status_code',
        description: 'The status code you want a cat from.'
      }]
    });
  }

  async run(ctx) {
    const code = ctx.options.status_code || 404;
    return {
      includeSource: true,
      embeds: [{
        image: { url: `https://http.cat/${code}.jpg` },
        footer: { text: 'Powered by http.cat' }
      }]
    };
  }
}
