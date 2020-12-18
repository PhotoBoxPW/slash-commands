const { SlashCommand } = require('slash-create');
const fetch = require('node-fetch');

module.exports = class IOTD extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'imageoftheday',
      description: 'Get Bing\'s Image of the Day.',
      throttling: {
        usages: 1,
        duration: 2,
      }
    });
  }

  async run(ctx) {
    await ctx.acknowledge(true);
    const res = (await fetch('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US').then(r => r.json()));
    const image = res.images[0];
    return {
      includeSource: true,
      embeds: [{
        title: image.copyright,
        url: image.copyrightlink,
        image: { url: `https://bing.com${image.url}` },
      }]
    };
  }
}
