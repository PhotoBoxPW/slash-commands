import { CommandOptionType, SlashCreator, CommandContext, User } from 'slash-create';
import { GenerationCommand } from '../../../imgsrv/abstracts';
import { HeartPayload } from '../../../imgsrv/payload';

export default class Ship extends GenerationCommand {
  endpoint = 'ship';
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'ship',
      description: 'Awww...',
      options: [
        {
          name: 'first_user',
          type: CommandOptionType.USER,
          description: 'The first user for the image.',
          required: true
        },
        {
          name: 'second_user',
          type: CommandOptionType.USER,
          description: 'The second user for this image.'
        },
        {
          name: 'heart',
          type: CommandOptionType.STRING,
          description: 'The heart (or emoji) in between the users.',
          choices: [
            // TODO: Use emojis in names when discord fixes issue #2537
            { name: 'Red', value: 'red' }, // ❤
            { name: 'Orange', value: 'orange' }, // 🧡
            { name: 'Yellow', value: 'yellow' }, // 💛
            { name: 'Green', value: 'green' }, // 💚
            { name: 'Blue', value: 'blue' }, // 💙
            { name: 'Purple', value: 'purple' }, // 💜
            { name: 'White', value: 'white' }, // 🤍
            { name: 'Brown', value: 'brown' }, // 🤎
            { name: 'Black', value: 'black' }, // 🖤
            { name: 'Broken Heart', value: 'broken' }, // 💔
            { name: 'Heart With Arrow (Cupid)', value: 'arrow' }, // 💘
            { name: 'Beating Heart', value: 'beating' }, // 💓
            { name: 'Growing Heart', value: 'growing' }, // 💗
            { name: 'Ribboned', value: 'ribbon' }, // 💝
            { name: 'Revolving Hearts', value: 'revolving' }, // 💞
            { name: 'Two Hearts', value: 'two' }, // 💕
            { name: 'Heart Decoration', value: 'decoration' } // 💟
          ]
        }
      ]
    });
  }

  async run(ctx: CommandContext) {
    const users: User[] = [ctx.users.get(ctx.options.first_user as string)!];

    if (ctx.options.second_user) users.push(ctx.users.get(ctx.options.second_user as string)!);
    else users.unshift(ctx.user);

    const payload: HeartPayload = {
      avatar1: users[0].dynamicAvatarURL(),
      avatar2: users[1].dynamicAvatarURL(),
      heart: (ctx.options.heart as string) || 'red'
    };

    return this.generate(ctx, payload);
  }
}
