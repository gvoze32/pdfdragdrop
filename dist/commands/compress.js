import fs from "fs";
import path from "path";
import { PDFDocument } from "pdf-lib";
import chalk from "chalk";
import ora from "ora";
export async function compressCommand(file) {
    const spinner = ora("Compressing PDF...").start();
    try {
        // Check if file exists
        if (!fs.existsSync(file)) {
            spinner.fail(chalk.red(`File not found: ${file}`));
            process.exit(1);
        }
        // Read PDF
        const pdfBytes = fs.readFileSync(file);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        // Remove metadata and optimize
        pdfDoc.setTitle("");
        pdfDoc.setAuthor("");
        pdfDoc.setSubject("");
        pdfDoc.setKeywords([]);
        pdfDoc.setProducer("");
        pdfDoc.setCreator("");
        // Save compressed PDF
        const compressedPdfBytes = await pdfDoc.save({
            useObjectStreams: true,
            addDefaultPage: false,
            objectsPerTick: 50,
        });
        // Generate output filename
        const ext = path.extname(file);
        const baseName = path.basename(file, ext);
        const dirName = path.dirname(file);
        const outputFile = path.join(dirName, `${baseName}-compress${ext}`);
        // Write compressed file
        fs.writeFileSync(outputFile, compressedPdfBytes);
        const originalSize = (fs.statSync(file).size / 1024).toFixed(2);
        const compressedSize = (fs.statSync(outputFile).size / 1024).toFixed(2);
        const reduction = (((fs.statSync(file).size - fs.statSync(outputFile).size) /
            fs.statSync(file).size) *
            100).toFixed(2);
        spinner.succeed(chalk.green("PDF compressed successfully!"));
        console.log(chalk.cyan(`Original size: ${originalSize} KB`));
        console.log(chalk.cyan(`Compressed size: ${compressedSize} KB`));
        console.log(chalk.yellow(`Reduction: ${reduction}%`));
        console.log(chalk.bold(`Output: ${outputFile}`));
    }
    catch (error) {
        spinner.fail(chalk.red("Failed to compress PDF"));
        console.error(chalk.red(error instanceof Error ? error.message : "Unknown error"));
        process.exit(1);
    }
}
//# sourceMappingURL=compress.js.map