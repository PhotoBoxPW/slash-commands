const { SlashCommand } = require('slash-create');

module.exports = class ServerInvite extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'serverinvite',
      description: 'Gets the server invite link.'
    });
  }

  async run() {
    return {
      content: 'Server Invite: https://join.photobox.pw',
      ephemeral: true
    };
  }
}
