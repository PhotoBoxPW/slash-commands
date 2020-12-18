const APICommand = require('../../apiCommand');

module.exports = class InspirationalQuote extends APICommand {
  constructor(creator) {
    super(creator, {
      name: 'inspirationalquote',
      description: 'Get a random inspirational quote.',
      url: 'https://inspirobot.me/api?generate=true',
      credit: 'inspirobot.me'
    });
  }
}
