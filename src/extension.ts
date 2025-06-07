import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as puppeteer from 'puppeteer';

let panel: vscode.WebviewPanel | undefined;
let browser: puppeteer.Browser | undefined;

const markdownToHtml = async (markdown: string): Promise<string> => {
  if (!browser) {
    try {
      browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        // ブラウザの実行可能ファイルへのパスを指定しない（システムのデフォルトを使用）
        executablePath: undefined,
        // Chromeをダウンロードせずに、システムにインストールされているものを使用
        channel: 'chrome'
      });
    } catch (error) {
      console.error('Puppeteer launch error:', error);
      // フォールバックとしてmarkedを直接使用
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Markdown Preview</title>
          <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css/github-markdown.min.css">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
              line-height: 1.6;
              color: #24292e;
              padding: 20px;
              max-width: 1200px;
              margin: 0 auto;
            }
            .markdown-body {
              box-sizing: border-box;
              min-width: 200px;
              max-width: 980px;
              margin: 0 auto;
              padding: 45px;
            }
            @media (max-width: 767px) {
              .markdown-body {
                padding: 15px;
              }
            }
          </style>
        </head>
        <body class="markdown-body">
          <div id="content"></div>
          <script>
            document.getElementById('content').innerHTML = marked.parse(${JSON.stringify(markdown)});
          </script>
        </body>
        </html>
      `;
    }
  }

  const page = await browser.newPage();
  
  // Simple HTML template with Chrome's rendering
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Markdown Preview</title>
      <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css/github-markdown.min.css">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
          line-height: 1.6;
          color: #24292e;
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .markdown-body {
          box-sizing: border-box;
          min-width: 200px;
          max-width: 980px;
          margin: 0 auto;
          padding: 45px;
        }
        @media (max-width: 767px) {
          .markdown-body {
            padding: 15px;
          }
        }
      </style>
    </head>
    <body class="markdown-body">
      <div id="content"></div>
      <script>
        document.getElementById('content').innerHTML = marked.parse(${JSON.stringify(markdown)});
      </script>
    </body>
    </html>
  `;

  await page.setContent(html);
  const content = await page.content();
  await page.close();
  return content;
};

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('markdown-preview-right-click.showPreview', async (uri?: vscode.Uri) => {
    // ファイルエクスプローラーから右クリックで呼び出された場合
    let document: vscode.TextDocument;
    
    if (uri) {
      try {
        document = await vscode.workspace.openTextDocument(uri);
        await vscode.window.showTextDocument(document, vscode.ViewColumn.One);
      } catch (e) {
        vscode.window.showErrorMessage(`ファイルを開けませんでした: ${e}`);
        return;
      }
    } else {
      // エディタ内から呼び出された場合
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage('エディタが開かれていません');
        return;
      }

      document = editor.document;
      if (document.languageId !== 'markdown') {
        vscode.window.showInformationMessage('マークダウンファイルではありません');
        return;
      }
    }

    // Create and show a new webview
    if (panel) {
      panel.reveal(vscode.ViewColumn.Beside);
    } else {
      panel = vscode.window.createWebviewPanel(
        'markdownPreview',
        'Markdown Preview',
        vscode.ViewColumn.Beside,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
        }
      );

      // Handle panel dispose
      panel.onDidDispose(
        () => {
          panel = undefined;
        },
        null,
        context.subscriptions
      );
    }

    // Update preview when document changes
    const updatePreview = async () => {
      if (panel) {
        const markdown = document.getText();
        try {
          const html = await markdownToHtml(markdown);
          panel.webview.html = html;
        } catch (error) {
          console.error('Markdown rendering error:', error);
          // エラーが発生した場合はフォールバックとしてクライアントサイドでレンダリング
          panel.webview.html = `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Markdown Preview</title>
              <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css/github-markdown.min.css">
              <style>
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
                  line-height: 1.6;
                  color: #24292e;
                  padding: 20px;
                  max-width: 1200px;
                  margin: 0 auto;
                }
                .markdown-body {
                  box-sizing: border-box;
                  min-width: 200px;
                  max-width: 980px;
                  margin: 0 auto;
                  padding: 45px;
                }
                @media (max-width: 767px) {
                  .markdown-body {
                    padding: 15px;
                  }
                }
              </style>
            </head>
            <body class="markdown-body">
              <div id="content"></div>
              <script>
                document.getElementById('content').innerHTML = marked.parse(${JSON.stringify(markdown)});
              </script>
            </body>
            </html>
          `;
        }
      }
    };

    // Initial update
    await updatePreview();

    // Update on document change
    const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(e => {
      if (e.document === document) {
        updatePreview();
      }
    });

    // Also update when editor changes
    const changeActiveEditor = vscode.window.onDidChangeActiveTextEditor(editor => {
      if (editor && editor.document === document) {
        updatePreview();
      }
    });

    // Clean up on panel close
    panel.onDidDispose(() => {
      changeDocumentSubscription.dispose();
      changeActiveEditor.dispose();
    }, null, context.subscriptions);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {
  if (browser) {
    browser.close();
  }
}
