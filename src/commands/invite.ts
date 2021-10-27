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
              url: 'https://discord.com/oauth2/authorize?client_id=284134563381248000&permissions=0&scope=bot%20applications.commands',
              emoji: {
                id: '847292938018357298'
              }
            },
            {
              type: ComponentType.BUTTON,
              style: ButtonStyle.LINK,
              label: 'Slash Commands Only',
              url: 'https://discord.com/oauth2/authorize?client_id=284134563381248000&scope=applications.commands',
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
