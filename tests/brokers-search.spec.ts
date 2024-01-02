import { test, expect } from '@playwright/test';
import { AllBrokersPage } from './pages/all-brokers-page';

// As per the task definition I have created a single automated test covering all the neccessary steps 
test('searching for each of the brokers names yeilds the correct result', async ({ page }) => {
    await Promise.all([page.waitForResponse("**/broker/filter?**"), page.goto('https://www.yavlena.com/broker/')]);

    let allBrokersPage = new AllBrokersPage(page);
    await Promise.all([allBrokersPage.waitForLoadMoreButtonToBeHidden(), allBrokersPage.clickLoadMoreButton()]);
    
    const numberOfBrokers = await allBrokersPage.getNumberOfBrokers();

    for(let i=0; i<numberOfBrokers; i++) {
        const name = await allBrokersPage.getNthBrokerName(i) as string;
        await Promise.all([page.waitForResponse("**/broker/filter?**"), allBrokersPage.searchForNameInBrokerSearchBar(name)]);

        expect(await allBrokersPage.getNumberOfBrokers(), "Only one broker should be displayed").toBe(1);
        expect(await allBrokersPage.getNthBrokerName(0), "The only vsible broker should have the expected name").toBe(name);
        expect(await allBrokersPage.checkIfFirstBrokerAddressIsVisible(), "The address for the only visible broker should be displayed").toBeTruthy();
        expect(await allBrokersPage.getFirstBrokerPhoneNumbersCount(), "Phone numbers for the first broker in the list should be a correct amount").toBe(2);
        expect(await allBrokersPage.checkIfFirstBrokerAssociatedPropertiesCountIsVisible(), "The number of associated properties for the only visible broker should be displayed").toBeTruthy();
    
        await Promise.all([page.waitForResponse("**/broker/filter?**"), allBrokersPage.clickClearAllFiltersForBrokerSearch()]);
    }
  });

// However, in my opinion of we were to add such a test, we would need to first add the following 2 tests.
// They cover exclusivelly 1 pair of action and its result.
// This way if a faulire in the first longer tests happens, but the other 2 tests pass, we would know the issue is isolated to the action of repeated searching.
  test('clicking Load more on all brokers page loads the information of all brokers', async ({ page }) => {
    await Promise.all([page.waitForResponse("**/broker/filter?**"), page.goto('https://www.yavlena.com/broker/')]);

    let allBrokersPage = new AllBrokersPage(page);
    await Promise.all([allBrokersPage.waitForLoadMoreButtonToBeHidden(), allBrokersPage.clickLoadMoreButton()]);
    
    expect(await allBrokersPage.getNumberOfBrokers(), "The number brokers displayed should be correct").toBe(115);
  });

  test('searching for the first broker name from all brokers page yeilds the correct result', async ({ page }) => {
    await Promise.all([page.waitForResponse("**/broker/filter?**"), page.goto('https://www.yavlena.com/broker/')]);

    let allBrokersPage = new AllBrokersPage(page);
    const name = await allBrokersPage.getNthBrokerName(0) as string;
    await Promise.all([page.waitForResponse("**/broker/filter?**"), allBrokersPage.searchForNameInBrokerSearchBar(name)]);

    expect(await allBrokersPage.getNumberOfBrokers(), "Only one broker should be displayed").toBe(1);
    expect(await allBrokersPage.getNthBrokerName(0), "The only vsible broker should have the expected name").toBe(name);
    expect(await allBrokersPage.checkIfFirstBrokerAddressIsVisible(), "The address for the only visible broker should be displayed").toBeTruthy();
    expect(await allBrokersPage.getFirstBrokerPhoneNumbersCount(), "Phone numbers for the first broker in the list should be a correct amount").toBe(2);
    expect(await allBrokersPage.checkIfFirstBrokerAssociatedPropertiesCountIsVisible(), "The number of associated properties for the only visible broker should be displayed").toBeTruthy();
  });