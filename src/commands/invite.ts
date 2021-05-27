import { SlashCommand, SlashCreator, ComponentType, ButtonStyle } from 'slash-create';

export default class Invite extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'invite',
      description: 'Gets the invite links for PhotoBox.'
    });
  }

  async run() {
    return {
      content: 'You can invite with the links below:',
      ephemeral: true,
      components: [
        {
          type: ComponentType.ACTION_ROW,
          components: [
            {
              type: ComponentType.BUTTON,
              style: ButtonStyle.LINK,
              label: 'Invite',
              url: 'https://invite.photobox.pw',
              emoji: {
                id: '847292938018357298'
              }
            },
            {
              type: ComponentType.BUTTON,
              style: ButtonStyle.LINK,
              label: 'Slash Commands Only',
              url: 'https://invite.snaz.in/photobox/commands',
              emoji: {
                id: '785919558376488990'
              }
            }
          ]
        }
      ]
    };
  }
}
