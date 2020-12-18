const { SlashCommand } = require('slash-create');

module.exports = class Invite extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'invite',
      description: 'Gets the bot invite link and the commands link.'
    });
  }

  async run() {
    return {
      content: 'Bot invite: https://invite.photobox.pw\nSlash Commands: https://invite.snaz.in/photobox/commands',
      ephemeral: true
    };
  }
}
