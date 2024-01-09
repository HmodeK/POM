import { Locator, Page } from "playwright";
import { BasePage } from "../infra/base-page";
export class PimPage extends BasePage {
    private deleteButton: Locator;
    private confirmDelete: Locator;
    constructor(page: Page) {
        super(page);
        this.deleteButton = page.locator('//div[@class="oxd-table-card"]//button[1]');
        this.confirmDelete = page.getByText('Yes, Delete');
        this.initPage()
    }
    initPage = async () => {
        await this.page.waitForLoadState()
    }

    removeRandomRecord = async () => {
        await this.deleteButton.nth(await this.randomNumber(0, await this.getButtonsCount() - 1)).click()
        await this.confirmDelete.click()
    }

    getButtonsCount = async () => {
        await this.page.waitForTimeout(5000)
        return await this.deleteButton.count();
    }

    randomNumber = async (min: number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    isToastVisible = async () => {
        const successToastSelector = '#oxd-toaster_1';
        await this.page.waitForSelector(successToastSelector, { state: 'visible' });
        return await this.page.isVisible(successToastSelector);
    }
}