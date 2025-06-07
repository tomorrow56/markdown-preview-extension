# Markdown Preview Enhanced

A VSCode extension that provides a side-by-side Markdown preview using Chrome's rendering engine.

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

1. Clone this repository
2. Run `npm install` to install dependencies
3. Press F5 to open a new window with the extension loaded
4. Open a Markdown file and use the "Open Preview" command

## Extension Settings

This extension contributes the following settings:

* `markdown-preview-enhanced.previewOnRight`: Show the preview on the right side (default: true)

## Known Issues

- Initial preview load might take a moment as it starts a headless Chrome instance
- Some complex Markdown extensions might not be fully supported

## Release Notes

### 0.1.0

Initial release with basic Markdown preview functionality
