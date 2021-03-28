import { SlashCommand, CommandOptionType, SlashCreator, CommandContext } from 'slash-create';

export default class Robohash extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'robohash',
      description: 'Get a robot based on anything. (Defaults to your user ID)',
      options: [
        {
          type: CommandOptionType.STRING,
          name: 'value',
          description: 'Any value you want a robohash from.'
        },
        {
          type: CommandOptionType.STRING,
          name: 'set',
          description: 'The set of robohashes you want to get from.',
          choices: [
            {
              name: 'Robots (default)',
              value: 'set1'
            },
            {
              name: 'Monsters',
              value: 'set2'
            },
            {
              name: 'Disembodied Robot Heads',
              value: 'set3'
            },
            {
              name: 'Kittens',
              value: 'set4'
            },
            {
              name: 'Humans',
              value: 'set5'
            }
          ]
        }
      ]
    });
  }

  async run(ctx: CommandContext) {
    const value = (ctx.options.value as string) || ctx.member.id;
    const set = ctx.options.set || 'set1';
    return {
      embeds: [
        {
          image: { url: `https://robohash.org/${encodeURIComponent(value)}.png?set=${set}` },
          footer: { text: 'Powered by robohash.org' }
        }
      ]
    };
  }
}
