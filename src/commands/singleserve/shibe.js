const APICommand = require('../../apiCommand');

module.exports = class Shibe extends APICommand {
  constructor(creator) {
    super(creator, {
      name: 'shibe',
      url: 'https://shibe.online/api/shibes?count=1',
      credit: 'shibe.online',
      emoji: '🐕'
    });
  }
}
