import { SlashCommand } from 'slash-create';
import needle from 'needle';

export default class IOTD extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'imageoftheday',
      description: "Get Bing's Image of the Day.",
      throttling: {
        usages: 1,
        duration: 2
      }
    });
  }

  async run() {
    const res = await needle('get', 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US');
    const image = res.body.images[0];
    return {
      ephemeral: true,
      embeds: [
        {
          title: image.copyright,
          url: image.copyrightlink,
          image: { url: `https://bing.com${image.url}` }
        }
      ]
    };
  }
}
