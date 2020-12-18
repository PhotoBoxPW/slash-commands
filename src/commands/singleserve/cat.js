const APICommand = require('../../apiCommand');

module.exports = class Cat extends APICommand {
  constructor(creator) {
    super(creator, {
      name: 'cat',
      url: 'http://aws.random.cat/meow',
      credit: 'random.cat',
      emoji: '🐱'
    });
  }
}
