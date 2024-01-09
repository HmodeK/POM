import { BrowserWrapper } from "../infra/browser-wrapper";
import { test, expect, chromium, Page } from '@playwright/test';
import { LoginPage } from "../logic/login-page";
import { Menu } from "../logic/menu";
import { PimPage } from "../logic/pim-page";
import configJson from "../config.json"

let browser: BrowserWrapper;
let page: Page;

test.describe('test', () => {
    test.beforeAll(async () => {
        browser = new BrowserWrapper;
    });
    test.beforeEach(async () => {
        page = await browser.getPage(configJson.url)
        const login = new LoginPage(page);
        await login.makeLogin(configJson.loginCredentials.userName, configJson.loginCredentials.password)
        const myInfo = new Menu(page)
        myInfo.goToPim()
    });
    test.afterAll(async () => {
        browser.closeBrowser()
    });
    test('Remove Record', async () => {
        const pimPage = new PimPage(page);
        await pimPage.removeRandomRecord()
        await page.waitForTimeout(3000);
        expect(await pimPage.isToastVisible()).toBeTruthy()
    })
})
