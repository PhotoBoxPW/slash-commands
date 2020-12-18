const APICommand = require('../../apiCommand');

module.exports = class Dog extends APICommand {
  constructor(creator) {
    super(creator, {
      name: 'dog',
      url: 'https://random.dog/woof.json',
      credit: 'random.dog',
      emoji: '🐶'
    });
  }
}
