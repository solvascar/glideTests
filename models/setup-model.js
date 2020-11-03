import { Selector, t } from 'testcafe';

class Setup {
    constructor () {
        this.topbarLabel = Selector('div.app-flow-top-bar__label');
        this.realEstateAgentRole = Selector('ul.app-choices__list > li:nth-child(1) > div.app-choices__choice__body');
        this.phonenumberInput = Selector('#widget\/phone_number_req');
        this.continueButton = Selector('button.app-flow-actions__next-btn');
    }

    async setupRealEstateNext (phone) {
        await t
            .click(this.realEstateAgentRole)
            .typeText(this.phonenumberInput, phone)
            .click(this.continueButton);
    }

}

export default new Setup();