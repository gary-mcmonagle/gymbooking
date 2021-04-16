import { Selector } from 'testcafe';
const moment = require('moment');
const username = process.env.LOGIN_USERNAME;
const password = process.env.LOGIN_PASSWORD;

console.log(process.env)

fixture `BOOK`
.page `https://bookwkg.freedom-leisure.co.uk/withdeanbookings/Account/LogOn`;

const getDate = () => {
    const threeDaysTime = moment().add(4, 'days');
    return threeDaysTime.format("DD/MM/YYYY")
}

const login = async(t) => {
    await t
    .typeText('#UserName', username)
    .typeText('#Password', password)
    .click('#LogOn > div > form > div > fieldset > p:nth-child(5) > input[type=submit]');

    const greeting = await Selector('#logindisplay > div > span').innerText;
    
    console.log(greeting);
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
    const time = await Selector('#accordion > div > table > tbody > tr:nth-child(1) > td.TimeField').innerText;
    console.log(time)
    await t.click('#accordion > div > table > tbody > tr:nth-child(1) > td.LinkField > a')
} 

const getClasses = async(t) => {
    await t.click('#searchForClass')
}

const book =  async (t) => {
    await t.click('#TermsAccepted');
    // await t.click('#CheckoutSubmit');
    // await t.click('#CentralRegion > div.main-content > div > div > p > a');
}

const run = async () => {
    test('RUN', async t => {
        await login(t);
        await getClasses(t);
        await getGyms(t);
        await addEarliestSession(t);
        await book(t);
    });
}

run()