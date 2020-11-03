import register from './models/register-model';
import setup from './models/setup-model';
import transaction from './models/transaction-model';

import { between } from './randomNumber.js';
import { randomString } from './randomString';

fixture `Initial Register Page`
    .page `https://staging.glide.com/auth/register/?code=glidebasic`;

const agent_firstname = 'Peter';
const agent_lastname = 'Smith';
const agent_email = 'psmith_test_'+between(1,10000)+'@glide.com';

test('Registering and creating transaction', async t => {    
    await register.submitRegister(agent_firstname, agent_lastname, agent_email, 'hek'+between(1,1000)+'g$t5');

    await t
        .expect(setup.topbarLabel.innerText).eql('Set Up Glide', 'Set up page title is not correct');

    await setup
        .setupRealEstateNext(between(1000000000,9000000000).toString());

    await setup
        .setupDefaultStateNext();

    await setup
        .setupLicenseVerificationNext('42424242', 'San Francisco Association of Realtors', randomString(6));

    //await t.expect(Selector('h1.app-trans-page-title__title').innerText).eql('Transactions', 'Set up did not finish succesfully', {timeout: 5000});

    await transaction.verifyTitle();
    await transaction.createTransaction(agent_firstname+' '+agent_lastname, 'Market Street', '1111', 'San Francisco', '94103', 'Listing', 'Preparing');
});