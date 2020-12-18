const { SlashCommand } = require('slash-create');
const { randint } = require('../util');

module.exports = class BunnyCommand extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'bunny',
      description: 'Get a random bunny.'
    });
  }

  async run() {
    return {
      includeSource: true,
      embeds: [{
        image: { url: `https://bunnies.media/gif/${randint(1, 163)}.gif` },
      }]
    };
  }
}
