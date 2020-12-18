const APICommand = require('../../apiCommand');

module.exports = class Wink extends APICommand {
  constructor(creator) {
    super(creator, {
      name: 'wink',
      description: '*wink*',
      url: 'https://some-random-api.ml/animu/wink',
      credit: 'some-random-api.ml'
    });
  }
}
