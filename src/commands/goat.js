const { SlashCommand } = require('slash-create');
const { randint } = require('../util');

module.exports = class Goat extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'goat',
      description: 'Get a random goat. 🐐'
    });
  }

  async run() {
    return {
      includeSource: true,
      embeds: [{
        image: { url: `https://placegoat.com/${randint(500, 700)}.png` },
      }]
    };
  }
}
