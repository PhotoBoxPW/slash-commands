const { SlashCommand, CommandOptionType } = require('slash-create');
const fetch = require('node-fetch');

module.exports = class WeebShCommand extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'weebsh',
      description: 'Utilizes the Weeb.sh API.',
      options: [{
        type: CommandOptionType.STRING,
        name: 'type',
        description: 'The type of image you want to get.',
        required: true
      }],
      throttling: {
        usages: 1,
        duration: 2,
      }
    });

    this.preload()
  }

  get headers() {
    return {
      'User-Agent': `PhotoBoxSlashCommands/1.0.0/${process.env.COMMANDS_DEBUG ? 'test' : 'production'}`,
      Authorization: `Wolke ${process.env.WEEBSH_KEY}`,
    }
  }

  async preload() {
    this.types = (await fetch('https://api.weeb.sh/images/types', { headers: this.headers })
      .then(r => r.json())).types.sort();
  }

  async run(ctx) {
    if (!this.types.includes(ctx.options.type))
      return {
        ephemeral: true,
        content: 'Invalid type, specify a type from this list:\n' + this.types.map(type => `\`${type}\``).join(', ')
      };
    else {
      await ctx.acknowledge(true);
      const image = (await fetch('https://api.weeb.sh/images/random?type=' + ctx.options.type, { headers: this.headers })
        .then(r => r.json()));
      if(image.status === 404)
        return `${ctx.member.mention}, Could not find any images with the query!`;
      return {
        embeds: [{
          image: { url: image.url },
          footer: { text: 'Powered by weeb.sh' }
        }]
      }
    }
  }
}
