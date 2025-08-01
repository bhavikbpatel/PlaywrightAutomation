const { test, expect } = require('@playwright/test');
const ExcelJS = require('exceljs');
const ExcelUtils = require('../utils/ExcelUtils');

/* async function excelRead(excelFile, workSheetName, valueToFind, change) {
    let output = { row: -1, col: -1 };
    /* const workBook = new ExcelJS.Workbook();
    await workBook.xlsx.readFile(excelFile)
    const workSheet = workBook.getWorksheet(workSheetName);
    workSheetName.eachRow(
        (row, rowNumber) => {
            row.eachCell((cell, colNumber) => {
                if (cell.value === valueToFind) {
                    output.col = colNumber;
                    output.row = rowNumber;
                }
            }
            );
        }
    );
    return output;
}


async function excelWrite(excelFile, workSheetName, valueToFind, valueToWrite, change) {

    const workBook = new ExcelJS.Workbook();
    await workBook.xlsx.readFile(excelFile)
    const workSheet = workBook.getWorksheet(workSheetName);

    const output = await excelRead(excelFile, workSheet, valueToFind, change);

    if (output.row != -1 && output.col != -1) {

        const cell = workSheet.getCell(output.row, output.col + change.columnChange);
        cell.value = valueToWrite;
        await workBook.xlsx.writeFile(excelFile);

    }
} */

test('Upload Download excel validataion', async ({ page }) => {
    const textSearch = "Papaya";
    const updateValue = "1111";
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    await downloadPromise;
    (await downloadPromise).saveAs("/Users/bhavik/Downloads/" + "download.xlsx");

    ExcelUtils.excelWrite("/Users/bhavik/Downloads/download.xlsx", "Sheet1", textSearch, updateValue, { rowChange: 0, columnChange: 2 });
    await page.getByRole('button', { name: 'Choose File' }).click();
    await page.getByRole('button', { name: 'Choose File' }).setInputFiles("/Users/bhavik/Downloads/download.xlsx");

    const textLocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({ has: textLocator });
    expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
}
);