#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import { compressCommand } from "./commands/compress.js";
import { mergeCommand } from "./commands/merge.js";
import { rotateCommand } from "./commands/rotate.js";
import { splitCommand } from "./commands/split.js";
import { toJpgCommand } from "./commands/to-jpg.js";
import { toPngCommand } from "./commands/to-png.js";
const program = new Command();
program
    .name("pdf")
    .description(chalk.bold.cyan("PDFDragDrop - Cross-platform CLI tool for PDF operations"))
    .version("2.0.0");
// Compress command
program
    .command("compress <file>")
    .description("Compress PDF file to reduce size")
    .action(compressCommand);
// Merge command
program
    .command("merge <files...>")
    .description("Merge multiple PDF files into one")
    .option("-o, --output <name>", "Output filename", "merged.pdf")
    .action(mergeCommand);
// Rotate command
program
    .command("rotate <file>")
    .description("Rotate PDF pages")
    .option("-d, --degrees <degrees>", "Rotation degrees (90, 180, 270)", "90")
    .option("-p, --pages <pages>", "Pages to rotate (e.g., 1,3,5 or all)", "all")
    .action(rotateCommand);
// Split command
program
    .command("split <file>")
    .description("Split PDF into separate pages")
    .option("-p, --pages <pages>", "Page range (e.g., 1-3 or 1,3,5)", "all")
    .action(splitCommand);
// Convert to JPG command
program
    .command("to-jpg <file>")
    .description("Convert PDF pages to JPG images")
    .option("-q, --quality <quality>", "Image quality (1-100)", "90")
    .option("-p, --pages <pages>", "Pages to convert (e.g., 1,3,5 or all)", "all")
    .action(toJpgCommand);
// Convert to PNG command
program
    .command("to-png <file>")
    .description("Convert PDF pages to PNG images")
    .option("-p, --pages <pages>", "Pages to convert (e.g., 1,3,5 or all)", "all")
    .action(toPngCommand);
// Show help by default if no command
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
program.parse(process.argv);
//# sourceMappingURL=index.js.map