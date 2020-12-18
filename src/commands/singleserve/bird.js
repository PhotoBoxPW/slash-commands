const APICommand = require('../../apiCommand');

module.exports = class Bird extends APICommand {
  constructor(creator) {
    super(creator, {
      name: 'bird',
      url: 'https://shibe.online/api/birds?count=1',
      credit: 'shibe.online',
      emoji: '🐦'
    });
  }
}
