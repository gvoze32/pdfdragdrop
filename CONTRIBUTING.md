# Contributing to PDFDragDrop

## Development Setup

1. Clone the repository:

```bash
git clone https://github.com/gvoze32/pdfdragdrop.git
cd pdfdragdrop
```

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

4. Test locally:

```bash
node dist/index.js --help
```

## Project Structure

```
pdfdragdrop/
├── src/
│   ├── commands/          # All PDF operation commands
│   │   ├── compress.ts    # PDF compression
│   │   ├── merge.ts       # PDF merging
│   │   ├── rotate.ts      # PDF rotation
│   │   ├── split.ts       # PDF splitting
│   │   ├── to-jpg.ts      # PDF to JPG conversion
│   │   └── to-png.ts      # PDF to PNG conversion
│   └── index.ts           # Main CLI entry point
├── dist/                  # Compiled JavaScript (auto-generated)
├── package.json           # Package configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # Documentation
```

## Making Changes

1. Edit TypeScript files in `src/`
2. Build: `npm run build`
3. Test your changes: `node dist/index.js <command>`

## Publishing

1. Update version in `package.json`
2. Build: `npm run build`
3. Publish: `npm publish`
