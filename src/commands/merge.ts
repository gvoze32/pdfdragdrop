import fs from "fs";
import path from "path";
import { PDFDocument } from "pdf-lib";
import chalk from "chalk";
import ora from "ora";

export async function mergeCommand(
  files: string[],
  options: { output: string }
) {
  const spinner = ora("Merging PDF files...").start();

  try {
    // Check if all files exist
    for (const file of files) {
      if (!fs.existsSync(file)) {
        spinner.fail(chalk.red(`File not found: ${file}`));
        process.exit(1);
      }
    }

    if (files.length < 2) {
      spinner.fail(chalk.red("Please provide at least 2 PDF files to merge"));
      process.exit(1);
    }

    // Create merged PDF
    const mergedPdf = await PDFDocument.create();

    // Add each PDF
    for (const file of files) {
      spinner.text = `Merging: ${path.basename(file)}...`;
      const pdfBytes = fs.readFileSync(file);
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    // Save merged PDF
    const mergedPdfBytes = await mergedPdf.save();

    // Ensure output has .pdf extension
    let outputFile = options.output;
    if (!outputFile.toLowerCase().endsWith(".pdf")) {
      outputFile += ".pdf";
    }

    fs.writeFileSync(outputFile, mergedPdfBytes);

    const pageCount = mergedPdf.getPageCount();
    spinner.succeed(chalk.green("PDF files merged successfully!"));
    console.log(chalk.cyan(`Total pages: ${pageCount}`));
    console.log(chalk.cyan(`Files merged: ${files.length}`));
    console.log(chalk.bold(`Output: ${outputFile}`));
  } catch (error) {
    spinner.fail(chalk.red("Failed to merge PDFs"));
    console.error(
      chalk.red(error instanceof Error ? error.message : "Unknown error")
    );
    process.exit(1);
  }
}
