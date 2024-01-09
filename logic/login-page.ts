import { Locator, Page } from "@playwright/test";
import { BasePage } from "../infra/base-page";

export class LoginPage extends BasePage {
    private userNameInput: Locator;
    private passwordInput: Locator;
    private submit: Locator;

    constructor(page: Page) {
        super(page);
        this.userNameInput = page.locator('//input[@name="username"]');
        this.passwordInput = page.locator('//input[@name="password"]');
        this.submit = page.locator('//button[@type="submit"]');
        this.initPage();
    }
    initPage = async () => {
        await this.page.waitForLoadState()
    }
    fillUserName = async (userName: string) => {
        await this.userNameInput.fill(userName)
    }
    fillPassword = async (password: string) => {
        await this.passwordInput.fill(password)
    }
    clickSubmit = async () => {
        await this.submit.click();
    }
    makeLogin = async (userName: string, password: string) => {
        await this.fillUserName(userName);
        await this.fillPassword(password);
        await this.clickSubmit();
    }

}