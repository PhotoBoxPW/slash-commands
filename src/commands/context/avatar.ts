import {
  SlashCommand,
  ApplicationCommandType,
  SlashCreator,
  CommandContext,
  ComponentType,
  ButtonStyle,
  ImageFormat
} from 'slash-create';

export default class ViewAvatar extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      type: ApplicationCommandType.USER,
      name: 'View Avatar'
    });
  }

  async run(ctx: CommandContext) {
    const user = ctx.targetUser!;

    const parts = user.avatar
      ? (['png', 'jpeg', 'webp'] as ImageFormat[]).map(
          (format) => `**[\`.${format.toUpperCase()}\`](${user.dynamicAvatarURL(format, 512)})**`
        )
      : [`**[\`.PNG\`](${user.defaultAvatarURL})**`];
    if (user.avatar?.startsWith('a_')) parts.unshift(`**[\`.GIF\`](${user.dynamicAvatarURL('gif', 512)})**`);

    return {
      embeds: [
        {
          title: `🖼️ ${user.username}'s Avatar`,
          description: '🔗 ' + parts.join(' '),
          image: { url: user.dynamicAvatarURL() }
        }
      ],
      components: [
        {
          type: ComponentType.ACTION_ROW,
          components: [
            {
              type: ComponentType.BUTTON,
              style: ButtonStyle.LINK,
              label: 'Open Avatar URL',
              url: user.dynamicAvatarURL()
            }
          ]
        }
      ],
      ephemeral: true
    };
  }
}
