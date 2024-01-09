import { BasePage } from "../infra/base-page";
import { Locator, Page } from "@playwright/test";
export class Menu extends BasePage{
    private myInfo: Locator;
    private pim: Locator;

    constructor(page:Page){
        super(page)
        this.myInfo = page.getByText('My Info', { exact: true })
        this.pim = page.getByText('PIM', { exact: true })
        this.initMenu();
    }
    initMenu = async () => {
        await this.page.waitForLoadState()
    }
    goToMyInfo = async () => {
        await this.myInfo.click()
    }
    goToPim = async () => {
        await this.pim.click()
    }
}