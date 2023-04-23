import { IReminderWebhookData } from '../lib/type';
import { IChannels } from '../lib/type';

import axios from 'axios';

export default class SlackMessage {
  private personalWebhookUrl: string;

  constructor() {
    this.personalWebhookUrl = process.env.PERSONAL_WEBHOOK_URL || '';
  }

  public async sendReminder(channel: IChannels, reminder: string): Promise<void> {
    const url = this.getChannelWebhookUrl(channel);
    const data: IReminderWebhookData = {
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: 'Reminder:'
          }
        },
        {
          type: 'section',
          text: {
            type: 'plain_text',
            text: reminder
          }
        }
      ]
    };
    await axios.post(url, { data: data });
  }

  private getChannelWebhookUrl(channel: string): string {
    const urls: Record<string, string> = {
      personal: this.personalWebhookUrl
    };
    return urls[channel];
  }
}
