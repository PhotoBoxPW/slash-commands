const APICommand = require('../../apiCommand');

module.exports = class Octocat extends APICommand {
  constructor(creator) {
    super(creator, {
      name: 'octocat',
      description: 'Get a random GitHub octocat.',
      url: 'https://hi.snaz.in/api/v1/blobs/octodex.json',
      credit: 'hi.snaz.in & octodex.github.com'
    });
  }
}
