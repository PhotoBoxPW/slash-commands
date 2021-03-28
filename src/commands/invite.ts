import { SlashCommand, SlashCreator } from 'slash-create';
import { stripIndents } from 'common-tags';

export default class Invite extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'invite',
      description: 'Gets the invite links for PhotoBox.'
    });
  }

  async run() {
    return {
      content: stripIndents`
        Invite: https://invite.photobox.pw
        Only Slash Commands: https://invite.snaz.in/photobox/commands
      `,
      ephemeral: true
    };
  }
}
