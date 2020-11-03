import { Selector, t } from 'testcafe';

class Register {
    constructor () {
        this.firstnameInput = Selector('#first_name');
        this.lastnameInput = Selector('#last_name');
        this.emailInput = Selector('#email');
        this.newpasswordInput = Selector('#password');
        this.signupButton = Selector('button.app-register-form__register-btn');
    }

    async submitRegister (firstname, lastname, email, password) {
        await t
            .typeText(this.firstnameInput, firstname)
            .typeText(this.lastnameInput, lastname)
            .typeText(this.emailInput, email)
            .typeText(this.newpasswordInput, password)
            .click(this.signupButton);
    }
}

export default new Register();