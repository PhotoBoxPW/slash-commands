const APICommand = require('../../apiCommand');

module.exports = class Pat extends APICommand {
  constructor(creator) {
    super(creator, {
      name: 'pat',
      description: '*pat*',
      url: 'https://some-random-api.ml/animu/pat',
      credit: 'some-random-api.ml'
    });
  }
}
