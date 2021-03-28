const { SlashCommand } = require('slash-create');

module.exports = class Invite extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'invite',
      description: 'Gets the invite links for PhotoBox.'
    });
  }

  async run() {
    return {
      content: 'Invite: https://invite.photobox.pw\nOnly Slash Commands: https://invite.snaz.in/photobox/commands',
      ephemeral: true
    };
  }
}
