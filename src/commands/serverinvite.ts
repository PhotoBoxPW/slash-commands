import { ButtonStyle, ComponentType, SlashCommand, SlashCreator } from 'slash-create';

export default class ServerInvite extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'serverinvite',
      description: 'Gets the server invite link.'
    });
  }

  async run() {
    return {
      content: 'You can join the server below:',
      ephemeral: true,
      components: [
        {
          type: ComponentType.ACTION_ROW,
          components: [
            {
              type: ComponentType.BUTTON,
              style: ButtonStyle.LINK,
              label: 'Join Server',
              url: 'https://discord.gg/77mywNN',
              emoji: {
                id: '847292938018357298'
              }
            }
          ]
        }
      ]
    };
  }
}
