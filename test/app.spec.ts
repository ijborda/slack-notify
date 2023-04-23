import { drinkWater } from '../src/app';
import SlackMessage from '../src/entities/SlackMessage';

import * as chai from 'chai';
import { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';

chai.use(chaiAsPromised);
chai.config.truncateThreshold = 0;

describe('Unit test for the app handler', () => {
  let sandbox: sinon.SinonSandbox;
  const originalEnv = process.env;

  let consoleErrorStub: sinon.SinonSpy;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    consoleErrorStub = sandbox.stub(console, 'error');

    process.env = { ...originalEnv };
  });

  afterEach(() => {
    sandbox.restore();
    process.env = originalEnv;
  });

  describe('drinkWater', () => {
    it('Should fulfill process if all is good', async () => {
      sandbox.stub(SlackMessage.prototype, 'sendReminder').resolves();

      await expect(drinkWater()).to.eventually.be.fulfilled;
    });

    it('Should fulfill process and catch error if something is wrong', async () => {
      sandbox.stub(SlackMessage.prototype, 'sendReminder').throws(new Error('ErrorMessage'));

      await expect(drinkWater()).to.eventually.be.fulfilled;
      expect(consoleErrorStub.calledOnce).to.be.true;
    });
  });
});
