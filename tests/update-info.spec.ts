import { BrowserWrapper } from "../infra/browser-wrapper";
import { test, expect, chromium, Page } from '@playwright/test';
import { LoginPage } from "../logic/login-page";
import { Menu } from "../logic/menu";
import { MyInfoPage } from "../logic/my-info";

let browser: BrowserWrapper;
let page: Page;

test.describe('test', () => {
    test.beforeAll(async () => {
        browser = new BrowserWrapper;
    });

    test.beforeEach(async () => {
        page = await browser.getPage('https://opensource-demo.orangehrmlive.com/')
        const login = new LoginPage(page);
        await login.makeLogin("waaed", "waaed123")
        const myInfo = new Menu(page)
        myInfo.goToMyInfo();
    });

    test.afterAll(async () => {
        browser.closeBrowser()
    });


    test('Update User Information', async () => {
        const myInfoPage = new MyInfoPage(page)
        await myInfoPage.updateUserInfo("waaed", "koftan", "azzam")
        await page.waitForTimeout(10000)
        expect(await myInfoPage.getFirstName()).toBe("waaed")
        expect(await myInfoPage.getMiddleName()).toBe("koftan")
        expect(await myInfoPage.getLastName()).toBe("azzam")
    })
})
