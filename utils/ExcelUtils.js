/**
 * @fileoverview Excel Utilities
 * @description This file contains the ExcelUtils class which provides utility methods
 * for reading from and writing to Excel files using ExcelJS library.
 * 
 * @author Bhavik
 * @created 2025-08-01
 * @version 1.0.0
 * 
 * @requires exceljs
 */

const ExcelJS = require('exceljs');

/**
 * ExcelUtils class provides static utility methods for Excel file operations
 * Contains methods for reading from and writing to Excel worksheets
 */
class ExcelUtils {
    /**
     * Reads Excel file and finds the position of a specific value
     * @static
     * @async
     * @function excelRead
     * @param {string} excelFile - Path to the Excel file
     * @param {string} workSheetName - Name of the worksheet to search in
     * @param {string} valueToFind - Value to search for in the worksheet
     * @param {Object} change - Configuration object for cell modifications
     * @returns {Promise<Object>} Object containing row and column numbers of found value
     * @description Searches through Excel worksheet to find a specific value and returns its position
     */
    static async excelRead(excelFile, workSheetName, valueToFind, change) {
        // Create new workbook instance
        const workBook = new ExcelJS.Workbook();
        // Read the Excel file
        await workBook.xlsx.readFile(excelFile);
        // Get the specific worksheet
        const workSheet = workBook.getWorksheet(workSheetName);

        // Initialize output object with default values
        let output = { row: -1, col: -1 };
        
        // Iterate through each row in the worksheet
        workSheet.eachRow((row, rowNumber) => {
            // Iterate through each cell in the current row
            row.eachCell((cell, colNumber) => {
                // Check if current cell value matches the search value
                if (cell.value === valueToFind) {
                    output.col = colNumber;
                    output.row = rowNumber;
                }
            });
        });
        
        return output;
    }

    /**
     * Writes a value to Excel file at a specific position relative to found value
     * @static
     * @async
     * @function excelWrite
     * @param {string} excelFile - Path to the Excel file
     * @param {string} workSheetName - Name of the worksheet to write to
     * @param {string} valueToFind - Value to search for as reference point
     * @param {string} valueToWrite - Value to write to the Excel file
     * @param {Object} change - Object containing columnChange property for offset
     * @description Finds a reference value and writes new value at an offset position
     */
    static async excelWrite(excelFile, workSheetName, valueToFind, valueToWrite, change) {
        // Create new workbook instance
        const workBook = new ExcelJS.Workbook();
        // Read the Excel file
        await workBook.xlsx.readFile(excelFile);
        // Get the specific worksheet
        const workSheet = workBook.getWorksheet(workSheetName);

        // Find the position of the reference value
        const output = await ExcelUtils.excelRead(excelFile, workSheetName, valueToFind, change);

        // If reference value is found, write the new value at offset position
        if (output.row !== -1 && output.col !== -1) {
            // Get the target cell using row and column with offset
            const cell = workSheet.getCell(output.row, output.col + change.columnChange);
            // Set the new value
            cell.value = valueToWrite;
            // Save the changes to the file
            await workBook.xlsx.writeFile(excelFile);
        }
    }
}

module.exports = ExcelUtils;