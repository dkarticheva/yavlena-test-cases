import { Page } from "@playwright/test";
import { AllBrokersPageElements } from "./elements/all-brokers-page-elements";

export class AllBrokersPage {

    page: Page;
    allBrokersPageElements: AllBrokersPageElements;

    constructor(page: Page) {
        this.page = page;
        this.allBrokersPageElements = new AllBrokersPageElements(page);
    }

    async clickLoadMoreButton() {
        await this.allBrokersPageElements.loadMoreButton().click();
    }

    async waitForLoadMoreButtonToBeHidden() {
        await this.allBrokersPageElements.loadMoreButton().waitFor({state: "hidden"});
    }

    async getNumberOfBrokers() {
        return (await this.allBrokersPageElements.brokerNames()).count();
    }

    async getNthBrokerName(nth: number) {
        return (await (await this.allBrokersPageElements.brokerNames()).nth(nth).textContent())?.trim();
    }

    async checkIfFirstBrokerAddressIsVisible() {
        return await this.allBrokersPageElements.brokerAddresses().nth(0).isVisible();
    }

    async getFirstBrokerPhoneNumbersCount() {
        return await this.allBrokersPageElements.brokerPhoneNumbers().count();
    }

    async checkIfFirstBrokerAssociatedPropertiesCountIsVisible() {
        return this.allBrokersPageElements.brokerAssociatedPropertiesCount().nth(0).isVisible();
    }

    async searchForNameInBrokerSearchBar(name: string) {
        await this.allBrokersPageElements.brokerSearchBar().pressSequentially(name);
        await this.page.keyboard.press("Enter");
    }

    async clickClearAllFiltersForBrokerSearch() {
        await this.allBrokersPageElements.clearAllFiltersButtonForBrokerSearch().click();
    }
}