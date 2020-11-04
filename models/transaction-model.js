import { Selector, t } from 'testcafe';
import SetupTransaction from './setuptransaction-model';

class Transaction {
    constructor () {
        this.newtransactionButton = Selector('button.app-btn.app-pipeline-content-bar__new-transaction');
        this.dashboardTitle = Selector('h1.app-trans-page-title__title');
        this.documentsMenu = Selector('ul.app-options-menu.app-sidebar__options-menu > li.app-sidebar__menu-item.app-sidebar__menu-item--level-1 > a > span').withText('Documents');
        this.uploadInput = Selector('span.ant-upload > input');
        this.generalSection = Selector('div.app-trans-documents > div:nth-child(1) > div:nth-child(1)');
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

    async loadDocument (file) {
        await t
            .click(this.documentsMenu)
            .setFilesToUpload(this.uploadInput, [
                file
            ]);
        
        const documentName = await this.generalSection.find('tr.app-table__body-row.app-folder-table__td-tr.app-table__body-row--clickable:nth-child(1)   > td:nth-child(2) > div > div > div.app-title-subtitle-cell__typographies > div > span');
        const filename = file.split('/')[file.split('/').length-1]
        console.log(filename);
        await t.expect(documentName.innerText).eql(filename, 'File was not uploaded');
    }
}

export default new Transaction();