import fs from "fs";
import path from "path";
import { PDFDocument } from "pdf-lib";
import chalk from "chalk";
import ora from "ora";
export async function splitCommand(file, options) {
    const spinner = ora("Splitting PDF...").start();
    try {
        // Check if file exists
        if (!fs.existsSync(file)) {
            spinner.fail(chalk.red(`File not found: ${file}`));
            process.exit(1);
        }
        // Read PDF
        const pdfBytes = fs.readFileSync(file);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const totalPages = pdfDoc.getPageCount();
        // Parse pages to split
        let pagesToSplit = [];
        if (options.pages.toLowerCase() === "all") {
            pagesToSplit = Array.from({ length: totalPages }, (_, i) => i);
        }
        else if (options.pages.includes("-")) {
            // Page range (e.g., 1-3)
            const [start, end] = options.pages
                .split("-")
                .map((p) => parseInt(p.trim()));
            pagesToSplit = Array.from({ length: end - start + 1 }, (_, i) => start - 1 + i).filter((p) => p >= 0 && p < totalPages);
        }
        else {
            // Comma-separated page numbers (1-indexed)
            const pageNumbers = options.pages
                .split(",")
                .map((p) => parseInt(p.trim()) - 1);
            pagesToSplit = pageNumbers.filter((p) => p >= 0 && p < totalPages);
        }
        if (pagesToSplit.length === 0) {
            spinner.fail(chalk.red("No valid pages to split"));
            process.exit(1);
        }
        // Generate output directory and filename base
        const ext = path.extname(file);
        const baseName = path.basename(file, ext);
        const dirName = path.dirname(file);
        // Split each page
        for (let i = 0; i < pagesToSplit.length; i++) {
            const pageIndex = pagesToSplit[i];
            spinner.text = `Splitting page ${pageIndex + 1}/${totalPages}...`;
            const newPdf = await PDFDocument.create();
            const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageIndex]);
            newPdf.addPage(copiedPage);
            const newPdfBytes = await newPdf.save();
            const outputFile = path.join(dirName, `${baseName}-split-${pageIndex + 1}${ext}`);
            fs.writeFileSync(outputFile, newPdfBytes);
        }
        spinner.succeed(chalk.green("PDF split successfully!"));
        console.log(chalk.cyan(`Total pages split: ${pagesToSplit.length}`));
        console.log(chalk.bold(`Output pattern: ${baseName}-split-{page}.pdf`));
    }
    catch (error) {
        spinner.fail(chalk.red("Failed to split PDF"));
        console.error(chalk.red(error instanceof Error ? error.message : "Unknown error"));
        process.exit(1);
    }
}
//# sourceMappingURL=split.js.map