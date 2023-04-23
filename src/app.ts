import SlackMessage from './entities/SlackMessage';

export const drinkWater = async () => {
  try {
    const slackMessage = new SlackMessage();
    await slackMessage.sendReminder('personal', "Don't forget to drink you water! 💧");
  } catch (err: unknown) {
    console.error(JSON.stringify(err, Object.getOwnPropertyNames(err)));
  }
};
