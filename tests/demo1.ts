import { Page, Locator } from '@playwright/test';
let message1 : string = "Hello";

let age : number = 20;
let bool : boolean = true;

let arrnumber : number[] = [1,2,4];
let data : any = "Hello";
data=42;

function add(a: number, b: number): number {
    return a + b;
}
let result = add(5, 10);

let user:{name:string,age:number,isActive:boolean}={name:"John", age:30, isActive:true};


class LoginPage {
    page: Page;
    signInButton: Locator;
    userName: Locator;
    password: Locator;
    constructor(page) {
        this.page = page;
        this.signInButton = page.locator('#login');
        this.userName = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
    }
}