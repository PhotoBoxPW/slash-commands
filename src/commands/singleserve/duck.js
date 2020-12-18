const APICommand = require('../../apiCommand');

module.exports = class Duck extends APICommand {
  constructor(creator) {
    super(creator, {
      name: 'duck',
      url: 'https://random-d.uk/api/v2/random?format=json',
      credit: 'random-d.uk',
      emoji: '🦆'
    });
  }
}
