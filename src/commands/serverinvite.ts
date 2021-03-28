import { SlashCommand, SlashCreator } from 'slash-create';

export default class ServerInvite extends SlashCommand {
  constructor(creator: SlashCreator) {
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
