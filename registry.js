import register from './models/register-model';
import setup from './models/setup-model';

import { between } from './randomNumber.js';

fixture `Initial Register Page`
    .page `https://staging.glide.com/auth/register/?code=glidebasic`;

test('Filling register form', async t => {    
    await register.submitRegister('Peter', 'Smith', 'psmith_test_'+between(1,10000)+'@glide.com', 'hek'+between(1,1000)+'g$t5');

    await t
        .expect(setup.topbarLabel.innerText).eql('Set Up Glide', 'Set up page title is not correct');

    await setup.setupRealEstateNext(between(1000000000,9000000000).toString());
})