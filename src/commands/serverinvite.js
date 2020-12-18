const { SlashCommand } = require('slash-create');

module.exports = class ServerInviteCommand extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'serverinvite',
      description: 'Gets the server invite link.'
    });
  }

  async run() {
    return {
      content: 'https://join.photobox.pw',
      ephemeral: true
    };
  }
}
