import fs from "fs";
import path from "path";
import chalk from "chalk";
import ora from "ora";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { createCanvas } from "canvas";
export async function toJpgCommand(file, options) {
    const spinner = ora("Converting PDF to JPG...").start();
    try {
        // Check if file exists
        if (!fs.existsSync(file)) {
            spinner.fail(chalk.red(`File not found: ${file}`));
            process.exit(1);
        }
        // Validate quality
        const quality = parseInt(options.quality);
        if (quality < 1 || quality > 100) {
            spinner.fail(chalk.red("Quality must be between 1 and 100"));
            process.exit(1);
        }
        // Read PDF
        const pdfBuffer = fs.readFileSync(file);
        const loadingTask = getDocument({
            data: pdfBuffer,
            standardFontDataUrl: "node_modules/pdfjs-dist/standard_fonts/",
        });
        const pdfDocument = await loadingTask.promise;
        const totalPages = pdfDocument.numPages;
        // Parse pages to convert
        let pagesToConvert = [];
        if (options.pages.toLowerCase() === "all") {
            pagesToConvert = Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        else {
            // Parse comma-separated page numbers (1-indexed)
            const pageNumbers = options.pages
                .split(",")
                .map((p) => parseInt(p.trim()));
            pagesToConvert = pageNumbers.filter((p) => p >= 1 && p <= totalPages);
        }
        if (pagesToConvert.length === 0) {
            spinner.fail(chalk.red("No valid pages to convert"));
            process.exit(1);
        }
        // Generate output directory and filename base
        const ext = path.extname(file);
        const baseName = path.basename(file, ext);
        const dirName = path.dirname(file);
        // Convert each page
        for (const pageNum of pagesToConvert) {
            spinner.text = `Converting page ${pageNum}/${totalPages} to JPG...`;
            const page = await pdfDocument.getPage(pageNum);
            const viewport = page.getViewport({ scale: 2.0 }); // 2x scale for better quality
            const canvas = createCanvas(viewport.width, viewport.height);
            const context = canvas.getContext("2d");
            await page.render({
                canvasContext: context,
                viewport: viewport,
            }).promise;
            // Save as JPG
            const outputFile = path.join(dirName, `${baseName}-page-${pageNum}.jpg`);
            const buffer = canvas.toBuffer("image/jpeg", { quality: quality / 100 });
            fs.writeFileSync(outputFile, buffer);
        }
        spinner.succeed(chalk.green("PDF converted to JPG successfully!"));
        console.log(chalk.cyan(`Pages converted: ${pagesToConvert.length}`));
        console.log(chalk.cyan(`Quality: ${quality}%`));
        console.log(chalk.bold(`Output pattern: ${baseName}-page-{page}.jpg`));
    }
    catch (error) {
        spinner.fail(chalk.red("Failed to convert PDF to JPG"));
        console.error(chalk.red(error instanceof Error ? error.message : "Unknown error"));
        process.exit(1);
    }
}
//# sourceMappingURL=to-jpg.js.map