import { Selector } from 'testcafe';
const moment = require('moment');


fixture `Getting Started`
.page `https://bookwkg.freedom-leisure.co.uk/withdeanbookings/Account/LogOn`;

const getDate = () => {
    const threeDaysTime = moment().add(2, 'days');
    return threeDaysTime.format("DD/MM/YYYY")
}

const loginNow = async(t) => {
    await t
    .typeText('#UserName', '******')
    .typeText('#Password', '******')
    .click('#LogOn > div > form > div > fieldset > p:nth-child(5) > input[type=submit]');
}
const selectGymClasses = async(t) => {
    const activitySelect = Selector('#Activity');
    const activityOption = activitySelect.find('option');
    await t
    .click(activitySelect)
    .click(activityOption.withText('Gym Session'))
}

const getGyms = async(t) => {
    await selectGymClasses(t)
    await t
    .click('#SearchDate')
    .pressKey('ctrl+a delete');
    await t
    .typeText('#SearchDate', getDate())
    .click('#SearchButtonDiv > input');
    await t
    .click('#SearchButtonDiv > input');

}

const addEarliestSession = async (t) => {
    await t.click('#basketControl_78_1')
} 

const getClasses = async(t) => {
    await t.click('#searchForClass')
}

const book =  async (t) => {
    await t.click('#TermsAccepted');
    await t.click('#CheckoutSubmit');
    await t.click('#CentralRegion > div.main-content > div > div > p > a');
}

const logIn = async () => {
    test('My first test', async t => {
        await loginNow(t);
        await getClasses(t);
        await getGyms(t);
        await addEarliestSession(t);
        await book(t);
    });
}

const run = async () => {
    await logIn();
}

run()