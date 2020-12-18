const APICommand = require('../../apiCommand');

module.exports = class RedPanda extends APICommand {
  constructor(creator) {
    super(creator, {
      name: 'redpanda',
      description: 'Get a random red panda.',
      url: 'https://some-random-api.ml/img/red_panda',
      credit: 'some-random-api.ml'
    });
  }
}
