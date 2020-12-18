const { SlashCommand } = require('slash-create');
const fetch = require('node-fetch');

module.exports = class APICommand extends SlashCommand {
  constructor(creator, { name, description, url, emoji, credit, guildID, extra = {} }) {
    super(creator, {
      name,
      description: description || `Get a random ${name}.${emoji ? ` ${emoji}` : ''}`,
      guildID,
      ...extra
    });

    this.url = url;
    this.credit = credit;
  }

  async run(ctx) {
    await ctx.acknowledge(true);
    let done = null;
    this.doTimer(ctx, d => (done = d));
    try {
      const res = await fetch(this.url, { headers: this.headers });
      if (done(true)) return;
      else done();
      if (res.status >= 200 && res.status < 300) {
        let body = await res.text();
        try {
          body = JSON.parse(body);
        } catch (e) {
          body = { text: body };
        }
        return this.messageObject(this.getImage(body));
      } else return `${ctx.member.mention}, The service gave us a ${res.status}! Try again later!`;
    } catch(e) {
      if (done(true)) return;
      done();
      return `${ctx.member.mention}, Seems like the URL doesn\'t exist! Contact support!`;
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

  doTimer(ctx, func) {
    let done = false;
    let quit = false;
    func(d => {
      if (d) return quit;
      done = true;
    });
    setTimeout(() => {
      if (!done) {
        quit = true;
        ctx.send(`${ctx.member.mention}, The request was dropped due to the call taking too long!`);
      }
    }, 10000);
  }
};
