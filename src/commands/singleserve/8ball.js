const { CommandOptionType } = require('slash-create');
const APICommand = require('../../apiCommand');

module.exports = class EightBall extends APICommand {
  constructor(creator) {
    super(creator, {
      name: '8ball',
      description: 'Ask the mighty eight ball. 🎱',
      url: 'https://nekos.life/api/v2/img/8ball',
      extra: {
        options: [{
          type: CommandOptionType.STRING,
          name: 'query',
          description: 'Whatever you want to tell the mighty eight ball.'
        }]
      }
    });
  }

  messageObject(url) {
    return {
      embeds: [{
        title: 'The eight ball says...',
        image: { url },
      }]
    }
  }
}
