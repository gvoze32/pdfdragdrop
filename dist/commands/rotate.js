import fs from "fs";
import path from "path";
import { PDFDocument, degrees } from "pdf-lib";
import chalk from "chalk";
import ora from "ora";
export async function rotateCommand(file, options) {
    const spinner = ora("Rotating PDF...").start();
    try {
        // Check if file exists
        if (!fs.existsSync(file)) {
            spinner.fail(chalk.red(`File not found: ${file}`));
            process.exit(1);
        }
        // Validate rotation degrees
        const rotationDegrees = parseInt(options.degrees);
        if (![90, 180, 270].includes(rotationDegrees)) {
            spinner.fail(chalk.red("Rotation degrees must be 90, 180, or 270"));
            process.exit(1);
        }
        // Read PDF
        const pdfBytes = fs.readFileSync(file);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const pages = pdfDoc.getPages();
        // Parse pages to rotate
        let pagesToRotate = [];
        if (options.pages.toLowerCase() === "all") {
            pagesToRotate = Array.from({ length: pages.length }, (_, i) => i);
        }
        else {
            // Parse comma-separated page numbers (1-indexed)
            const pageNumbers = options.pages
                .split(",")
                .map((p) => parseInt(p.trim()) - 1);
            pagesToRotate = pageNumbers.filter((p) => p >= 0 && p < pages.length);
        }
        // Rotate pages
        for (const pageIndex of pagesToRotate) {
            pages[pageIndex].setRotation(degrees(rotationDegrees));
        }
        // Save rotated PDF
        const rotatedPdfBytes = await pdfDoc.save();
        // Generate output filename
        const ext = path.extname(file);
        const baseName = path.basename(file, ext);
        const dirName = path.dirname(file);
        const outputFile = path.join(dirName, `${baseName}-rotated${ext}`);
        // Write rotated file
        fs.writeFileSync(outputFile, rotatedPdfBytes);
        spinner.succeed(chalk.green("PDF rotated successfully!"));
        console.log(chalk.cyan(`Rotation: ${rotationDegrees}°`));
        console.log(chalk.cyan(`Pages rotated: ${pagesToRotate.length}`));
        console.log(chalk.bold(`Output: ${outputFile}`));
    }
    catch (error) {
        spinner.fail(chalk.red("Failed to rotate PDF"));
        console.error(chalk.red(error instanceof Error ? error.message : "Unknown error"));
        process.exit(1);
    }
}
//# sourceMappingURL=rotate.js.map