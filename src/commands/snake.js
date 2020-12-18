const { SlashCommand } = require('slash-create');
const { randint } = require('../util');

module.exports = class SnakeCommand extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'snake',
      description: 'Get a random snake.'
    });
  }

  async run() {
    return {
      includeSource: true,
      embeds: [{
        image: { url: `http://fur.im/snek/i/${randint(1, 874)}.png` },
      }]
    };
  }
}
