const APICommand = require('../../apiCommand');

module.exports = class Fox extends APICommand {
  constructor(creator) {
    super(creator, {
      name: 'fox',
      url: 'https://randomfox.ca/floof/',
      credit: 'randomfox.ca',
      emoji: '🦊'
    });
  }
}
