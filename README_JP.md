# Markdown プレビュー 右クリック拡張機能

Chromeのレンダリングエンジンを使用して、右クリックメニューからサイドバイサイドでマークダウンプレビューを提供するVSCode拡張機能です。

## 機能

- サイドパネルでリアルタイムのマークダウンプレビュー
- 正確なレンダリングのためにChromeのレンダリングエンジンを使用
- 入力に合わせて自動更新
- クリーンなGitHubスタイルのマークダウン表示
- 異なるウィンドウサイズで動作するレスポンシブデザイン

## 使用方法

1. VSCodeでマークダウン（.md）ファイルを開く
2. 以下のいずれかの方法でプレビューを開く：
   - エディタのタイトルメニューの「プレビューを横に表示」ボタンをクリック
   - コマンドパレット（Cmd+Shift+P）を開き、「Markdown: プレビューを横に表示」を検索
   - エディタ内で右クリックし、「プレビューを横に表示」を選択
   - エクスプローラービューでマークダウンファイルを右クリックし、「プレビューを横に表示」を選択

## 必要条件

- VSCode 1.85.0以上
- Node.js 14.x以上
- npmまたはyarn

## インストール

### 方法1: VSIXファイルからインストール

1. [GitHub Releases](https://github.com/tomorrow56/markdown-preview-extension/releases)からVSIXファイルをダウンロード
2. VS Codeを開く
3. 拡張機能ビューを開く（Ctrl+Shift+XまたはCmd+Shift+X）
4. 拡張機能ビューの右上にある「...」メニューをクリック
5. 「VSIXからインストール...」を選択
6. ダウンロードしたVSIXファイルを選択
7. 必要に応じてVS Codeを再起動

### 方法2: ソースからビルド

1. このリポジトリをクローン
2. `npm install`を実行して依存関係をインストール
3. F5キーを押して、拡張機能がロードされた新しいウィンドウを開く
   - MacでF5キーが使えない場合は、メニューから「実行」→「デバッグの開始」を選択
4. マークダウンファイルを開き、「Markdown: プレビューを横に表示」コマンドを使用

## 拡張機能の設定

この拡張機能は以下の設定を提供します：

* `markdown-preview-enhanced.previewOnRight`: プレビューを右側に表示（デフォルト: true）

## 既知の問題

- 初回のプレビュー読み込みは、ヘッドレスChromeインスタンスを起動するため少し時間がかかる場合があります
- 一部の複雑なマークダウン拡張機能は完全にサポートされていない場合があります
- システムにChromeがインストールされていない場合は、フォールバックとしてクライアントサイドのレンダリングを使用します

## リリースノート

### 0.1.0

基本的なマークダウンプレビュー機能を備えた初期リリース
