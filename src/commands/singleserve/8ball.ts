import { CommandOptionType, SlashCreator } from 'slash-create';
import APICommand from '../../apiCommand';

export default class EightBall extends APICommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: '8ball',
      description: 'Ask the mighty eight ball. 🎱',
      url: 'https://hi.snaz.in/api/v1/eightball/random.json',
      options: [
        {
          type: CommandOptionType.STRING,
          name: 'query',
          description: 'Whatever you want to tell the mighty eight ball.'
        }
      ]
    });
  }

  messageObject(url: string) {
    return {
      embeds: [
        {
          title: 'The eight ball says...',
          image: { url }
        }
      ]
    };
  }
}
