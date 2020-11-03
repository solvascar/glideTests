import { Selector, t } from 'testcafe';

class SetupTransaction {
    constructor () {
        this.primaryagentInput = Selector('input.ant-input.ant-select-search__field');
        this.primaryagentDefaultListItem = Selector('li.ant-select-dropdown-menu-item.ant-select-dropdown-menu-item-active');
        this.continueButton = Selector('button.app-flow-actions__next-btn');
        this.streetaddressInput = Selector('input.ant-input.ant-select-search__field');
        this.streetaddressDefaultListItem = Selector('li.ant-select-dropdown-menu-item.ant-select-dropdown-menu-item-active');
        this.unitInput = Selector('#property\\.address\\.unit');
        this.zipcodeInput = Selector('#property\\.address\\.zip_code');
        this.cityInput = Selector('#property\\.address\\.city');
        this.typeElementListing = Selector('div.app-flow-page__form-content > div:nth-child(2) > div > div > span > div > ul >li > div >span.app-choices__choice__label').withText('Listing');
        this.typeElementPurchase = Selector('div.app-flow-page__form-content > div:nth-child(2) > div > div > span > div > ul >li > div >span.app-choices__choice__label').withText('Purchase');
        this.typeElementSelected = Selector('li.app-choices__choice.app-choices__choice--selected');
        this.statusProspect = Selector('div.app-flow-page__form-content > div:nth-child(3) > div > div > span > div > ul >li > div >span.app-choices__choice__label').withText('Prospect');
        this.statusPreparing = Selector('div.app-flow-page__form-content > div:nth-child(3) > div > div > span > div > ul >li > div >span.app-choices__choice__label').withText('Preparing');
        this.statusActive = Selector('div.app-flow-page__form-content > div:nth-child(3) > div > div > span > div > ul >li > div >span.app-choices__choice__label').withText('Active');
        this.statusUnderContract = Selector('div.app-flow-page__form-content > div:nth-child(3) > div > div > span > div > ul >li > div >span.app-choices__choice__label').withText('Under Contract');
    }

    async setPrimaryAgent (agent_name) {
        await t
            .click(this.primaryagentInput)
            .typeText(this.primaryagentInput, agent_name)
            .click(this.primaryagentDefaultListItem)
            .click(this.continueButton);
    }

    async setPropertyAddress (street, unit, city, zipcode) {
        await t
            .click(this.streetaddressInput)
            .typeText(this.primaryagentInput, street)
            .click(this.streetaddressDefaultListItem)
            .typeText(this.unitInput, unit);

        if(await this.cityInput.value!=city) {
            // city is not the same one in parameters
            await t.typeText(this.cityInput, city);
        };

        await t
            .typeText(this.zipcodeInput, zipcode)
            .click(this.continueButton);
    }

    async setTypeTransaction (type, status) {
        if (type.toUpperCase() == 'LISTING') {
            await t
                .expect(this.typeElementListing.exists).ok('Listing type element does not exist')
                .click(this.typeElementListing);
        }
        else {
            await t
                .expect(this.typeElementPurchase.exists).ok('Listing type element does not exist')
                .click(this.typeElementPurchase);
        }
        await t.expect(this.typeElementSelected.exists).ok();

        switch (status.toUpperCase()) {
            case 'PROSPECT':
                await t
                    .expect(this.statusProspect.exists).ok('Prospect status does not exist')
                    .click(this.statusProspect);
                break;
            case 'PREPARING':
                await t
                    .expect(this.statusPreparing.exists).ok('Preparing status does not exist')
                    .click(this.statusPreparing);
                break;
            case 'ACTIVE':
                await t
                    .expect(this.statusActive.exists).ok('Active status does not exist')
                    .click(this.statusActive);
                break;
            case 'UNDER CONTRACT':
                await t
                    .expect(this.statusUnderContract.exists).ok('Under Contract status does not exist')
                    .click(this.statusUnderContract);
                break;
            default:
                  console.log(`Sorry, we do not consider status ${status}.`);
        }

        await t.click(this.continueButton);
    }
}

export default new SetupTransaction();