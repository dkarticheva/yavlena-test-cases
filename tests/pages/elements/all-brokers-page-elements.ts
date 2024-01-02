import { Page } from "@playwright/test";

export class AllBrokersPageElements {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async brokerNames() {
        return this.page.locator(".broker-card .name");
    }
    brokerAddresses() { 
        return this.page.locator(".broker-card .office");
    }

    brokerPhoneNumbers() { 
        return this.page.locator(".broker-card .tel");
    }

    brokerAssociatedPropertiesCount() { 
        return this.page.locator(".broker-card .position a");
    }

    loadMoreButton() { 
        return this.page.locator(".load-more-brokers .green-btn");
    }

    brokerSearchBar() { 
        return this.page.locator(".filter-bar #searchBox");
    }

    clearAllFiltersButtonForBrokerSearch() {
        return this.page.locator(".filter-bar .clear-all-dropdowns");
    }
}