import SlackMessage from '../src/entities/SlackMessage';

import axios from 'axios';
import * as chai from 'chai';
import { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiExclude from 'chai-exclude';
import * as sinon from 'sinon';

chai.use(chaiAsPromised);
chai.use(chaiExclude);
chai.config.truncateThreshold = 0;

describe('Unit test for the userProfle handler', () => {
  let sandbox: sinon.SinonSandbox;
  const originalEnv = process.env;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.useFakeTimers();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    sandbox.restore();
    process.env = originalEnv;
  });

  describe('Create', () => {
    it('Should process sendReminder successfully if all is good', async () => {
      const axiosStub = sandbox.stub(axios, 'post').resolves();

      await expect(new SlackMessage().sendReminder('personal', 'Reminder')).to.eventually.be.fulfilled;
      expect(axiosStub.calledOnce).to.be.true;
    });
  });
});
