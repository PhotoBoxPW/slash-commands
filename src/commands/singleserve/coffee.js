const APICommand = require('../../apiCommand');

module.exports = class Coffee extends APICommand {
  constructor(creator) {
    super(creator, {
      name: 'coffee',
      description: 'Get coffee. ☕',
      url: 'https://coffee.alexflipnote.dev/random.json',
      credit: 'coffee.alexflipnote.dev'
    });
  }
}
