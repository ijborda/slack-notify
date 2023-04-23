/**
 * Type declarations
 */

/**
 * Data structure for reminders.
 */
interface IReminderWebhookData {
  blocks: {
    type: string;
    text: {
      type: string;
      text: string;
    };
  }[];
}

/**
 * Payload structure for reminders.
 */
export interface IReminderWebhookPayload {
  url: string;
  data: IReminderWebhookData;
}

export type IChannels = 'personal' | 'scitree';
