const APICommand = require('../../apiCommand');

module.exports = class Blob extends APICommand {
  constructor(creator) {
    super(creator, {
      name: 'blob',
      description: 'Get a random blob emoji from blobs.gg.',
      url: 'https://hi.snaz.in/api/v1/blobs/random.json',
      credit: 'hi.snaz.in & blobs.gg'
    });
  }
}
