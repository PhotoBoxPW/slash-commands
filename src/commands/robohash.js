const { SlashCommand, CommandOptionType } = require('slash-create');

module.exports = class RobohashCommand extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'robohash',
      description: 'Get a robot based on anything. (Defaults to your user ID)',
      options: [{
        type: CommandOptionType.STRING,
        name: 'value',
        description: 'Any value you want a robohash from.'
      }, {
        type: CommandOptionType.STRING,
        name: 'set',
        description: 'The set of robohashes you want to get from.',
        choices: [{
          name: 'Robots (default)',
          value: 'set1'
        }, {
          name: 'Monsters',
          value: 'set2'
        }, {
          name: 'Disembodied Robot Heads',
          value: 'set3'
        }, {
          name: 'Kittens',
          value: 'set4'
        }, {
          name: 'Humans',
          value: 'set5'
        }]
      }]
    });
  }

  async run(ctx) {
    const value = ctx.options.value || ctx.member.id;
    const set = ctx.options.set || 'set1';
    return {
      includeSource: true,
      embeds: [{
        image: { url: `https://robohash.org/${encodeURIComponent(value)}.png?set=${set}` },
      }]
    };
  }
}
