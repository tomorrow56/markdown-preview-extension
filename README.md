# Markdown Preview Right Click

A VSCode extension that provides a side-by-side Markdown preview with right-click context menu integration using Chrome's rendering engine.

## Features

- Real-time Markdown preview in a side panel
- Uses Chrome's rendering engine for accurate rendering
- Updates automatically as you type
- Clean, GitHub-style markdown styling
- Responsive design that works at different window sizes

## Usage

1. Open a Markdown (.md) file in VSCode
2. Use one of these methods to open the preview:
   - Click the "Open Preview" button in the editor title menu
   - Use the Command Palette (Cmd+Shift+P) and search for "Open Preview"
   - Right-click in the editor and select "Open Preview"

## Requirements

- VSCode 1.85.0 or higher
- Node.js 14.x or higher
- npm or yarn

## Installation

### Method 1: Install from VSIX file

1. Download the VSIX file from [GitHub Releases](https://github.com/tomorrow56/markdown-preview-extension/releases)
2. Open VS Code
3. Go to Extensions view (Ctrl+Shift+X or Cmd+Shift+X)
4. Click on the "..." menu in the top-right corner of the Extensions view
5. Select "Install from VSIX..."
6. Navigate to the downloaded VSIX file and select it
7. Restart VS Code if prompted

### Method 2: Build from source

1. Clone this repository
2. Run `npm install` to install dependencies
3. Press F5 to open a new window with the extension loaded
4. Open a Markdown file and use the "Markdown: Open Preview" command

## Extension Settings

This extension contributes the following settings:

* `markdown-preview-enhanced.previewOnRight`: Show the preview on the right side (default: true)

## Known Issues

- Initial preview load might take a moment as it starts a headless Chrome instance
- Some complex Markdown extensions might not be fully supported

## Release Notes

### 0.1.0

Initial release with basic Markdown preview functionality
