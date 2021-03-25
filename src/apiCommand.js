const { SlashCommand } = require('slash-create');
const needle = require('needle');

module.exports = class APICommand extends SlashCommand {
  constructor(creator, { name, description, url, emoji, credit, guildID, extra = {} }) {
    super(creator, {
      name,
      description: description || `Get a random ${name}.${emoji ? ` ${emoji}` : ''}`,
      guildIDs: guildID,
      deferEphemeral: false,
      ...extra
    });

    this.url = url;
    this.credit = credit;
  }

  async run(ctx) {
    try {
      const res = await needle('get', this.url, {
        headers: this.headers,
        open_timeout: 2000,
        response_timeout: 1000,
        read_timeout: 1000
      });
      if (res.statusCode >= 200 && res.statusCode < 300) {
        return this.messageObject(this.getImage(res.body));
      } else return {
        content: `The service gave us a ${res.status}! Try again later!`,
        ephemeral: true
      };
    } catch(e) {
      return {
        content: 'An error occurred with the API!',
        ephemeral: true
      };
    }
  }

  get headers() {
    return {}
  }

  messageObject(url) {
    return {
      embeds: [{
        image: { url },
        ...(this.credit ? {
          footer: { text: `Powered by ${this.credit}` }
        } : {})
      }]
    }
  }

  getImage(res) {
    return res.url || res.file || res.image || res.link || res.text || res[0]
  }
};
