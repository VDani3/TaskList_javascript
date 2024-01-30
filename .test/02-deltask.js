// carreguem les llibreries
const { BaseTest } = require("./BaseTest.js")
const { By, until } = require("selenium-webdriver");
const assert = require('assert');
 
// heredem una classe amb un sol mètode test()
// emprem this.driver per utilitzar Selenium
 
class MyTest extends BaseTest
{
    async test() {
        // testejem afegir tasca en tasklist de Cordova
        //////////////////////////////////////////////////////
        await this.driver.get("http://localhost:8000/browser/www/");
 
        // el prompt pel text de la tasca es tracta igual que un alert en Selenium
        for (var i = 0; i < 3; i++){
            await this.driver.findElement(By.xpath("//button[text()='+']")).click();
            await this.driver.wait(until.alertIsPresent(),2000,"ERROR TEST: el botó '+' d'afegir tasca ha d'obrir un prompt.");
            let prompt = await this.driver.switchTo().alert();
            // afegim el text de la tasca i acceptem
            var taskText = "Tasca "+i;
            prompt.sendKeys(taskText);
            await this.driver.sleep(1000);
            await prompt.accept();
            await this.driver.sleep(1000);
        }

        await this.driver.findElement(By.xpath("(//button[@id='delete'])[2]")).click();
        // checkejem tasca
        // await this.driver.findElement(By.xpath("//li[text()='"+taskText+"']")).click();
 
        console.log("TEST OK");
    }
}
 
// executem el test
 
(async function test_example() {
    const test = new MyTest();
    await test.run();
    console.log("END")
})();