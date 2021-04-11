import { Selector } from 'testcafe';


fixture `Getting Started`
.page `https://bookwkg.freedom-leisure.co.uk/withdeanbookings/Account/LogOn`;



const loginNow = async(t) => {
    await t
    .typeText('#UserName', '*******')
    .typeText('#Password', '*******')
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
    .typeText('#SearchDate', '21/4/2021')
    .click('#SearchButtonDiv > input');
}


const getClasses = async(t) => {
    await t.click('#searchForClass')
}

const logIn = async () => {
    test('My first test', async t => {
        await loginNow(t);
        await getClasses(t);
        await getGyms(t);
    });

}

const run = async () => {
    await logIn();
}

run()