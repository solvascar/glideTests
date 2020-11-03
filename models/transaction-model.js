import { Selector, t } from 'testcafe';
import SetupTransaction from './setuptransaction-model';

class Transaction {
    constructor () {
        this.newtransactionButton = Selector('button.app-btn.app-pipeline-content-bar__new-transaction');
        this.dashboardTitle = Selector('h1.app-trans-page-title__title');
    }

    async createTransaction (agent_name, street, unit, city, zipcode, transaction_type, transaction_status) {
        await t.click(this.newtransactionButton);
        await SetupTransaction.setPrimaryAgent(agent_name);
        await SetupTransaction.setPropertyAddress(street, unit, city, zipcode);
        await SetupTransaction.setTypeTransaction(transaction_type, transaction_status);
        await t.expect(this.dashboardTitle.innerText).eql('Transaction Overview', 'Transaction was not created succesfully');
    }

    async verifyTitle () {
        await t.expect(this.dashboardTitle.innerText).eql('Transactions', 'Set up did not finish succesfully');
    }
}

export default new Transaction();