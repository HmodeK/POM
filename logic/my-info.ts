import { Locator, Page } from "@playwright/test";
import { BasePage } from "../infra/base-page";

export class MyInfoPage extends BasePage {
    private firstNameInput: Locator;
    private middleNameInput: Locator;
    private lastNameInput: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        super(page)
        this.firstNameInput = page.locator('//input[@name="firstName"]');
        this.middleNameInput = page.locator('//input[@name="middleName"]');
        this.lastNameInput = page.locator('//input[@name="lastName"]');
        this.saveButton = page.locator('//div[@class="oxd-form-actions"]//button');
        this.initPage()
    }

    initPage = async () => {
        await this.page.waitForLoadState()
    }

    fillFirstName = async (firstName: string) => {
        await this.page.waitForTimeout(5000)
        await this.clearInput(this.firstNameInput)
        await this.firstNameInput.type(firstName,{delay:100})
    }
    fillMiddleName = async (middleName: string) => {
        await this.middleNameInput.clear()
        await this.middleNameInput.type(middleName,{delay:100})
    }
    fillLasttName = async (lastName: string) => {
        await this.lastNameInput.clear()
        await this.lastNameInput.type(lastName,{delay:100})
    }
    clickSaveButton = async () => {
        await this.saveButton.first().click()
    }
    clearInput =async (input: Locator) => {
        
        await input.clear()
    }
    getFirstName = async () => {
        return await this.firstNameInput.inputValue()
    }
    getMiddleName = async () => {
        return await this.middleNameInput.inputValue()
    }
    getLastName = async () => {
        return await this.lastNameInput.inputValue()
    }
    updateUserInfo = async (firstName: string, middleName: string, lastName: string) => {
        await this.fillFirstName(firstName);
        await this.fillMiddleName(middleName);
        await this.fillLasttName(lastName);
        await this.clickSaveButton();
    }
}