import { Selector, t } from 'testcafe';

class Setup {
    constructor () {
        this.topbarLabel = Selector('div.app-flow-top-bar__label');
        this.realEstateAgentRole = Selector('ul.app-choices__list > li:nth-child(1) > div.app-choices__choice__body');
        this.phonenumberInput = Selector('#widget\\/phone_number_req');
        this.continueButton = Selector('button.app-flow-actions__next-btn');
        this.agentlicenseInput = Selector('#agentinfo\\.license_number');
        this.localassociationDiv = Selector('div#agentinfo\\.association_ids');
        this.localassociationInput = Selector('input#agentinfo\\.association_ids');
        this.localassociationDefaultListItem = Selector('li.ant-select-dropdown-menu-item.ant-select-dropdown-menu-item-active');
        this.brokerfirmnameInput = Selector('#agentinfo\\.company_name');
    }

    async setupRealEstateNext (phone) {
        await t
            .click(this.realEstateAgentRole)
            .typeText(this.phonenumberInput, phone)
            .click(this.continueButton);
    }

    async setupDefaultStateNext () {
        await t
            .click(this.continueButton);
    }

    async setupLicenseVerificationNext (license_id, association_name, broker_name) {
        await t
            .typeText(this.agentlicenseInput, license_id)
            .click(this.localassociationDiv)
            .typeText(this.localassociationInput, association_name)
            .click(this.localassociationDefaultListItem)
            .typeText(this.brokerfirmnameInput, broker_name)
            .click(this.continueButton);
    }
}

export default new Setup();