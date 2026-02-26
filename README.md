# dev-env-checker

Development environment checker script.

## Usage

```bash
node check.mjs
```

実行すると、各ツールのインストール状況がターミナルに表示され、結果が `results.json` に保存される。

## Checked Tools

| ツール名 | コマンド | 確認方法 |
| --- | --- | --- |
| Node.js | `node` | `node -v` |
| npm | `npm` | `npm -v` |
| Git | `git` | `git --version` |
| Claude Code | `claude` | `claude --version` |
| VSCode | `code` | `code --version` |
| Ghostty | `ghostty` | `ghostty --version` |

## results.json

実行後にプロジェクトルートへ `results.json` が出力される。

```json
{
  "checkedAt": "2026-02-26T02:39:47.847Z",
  "results": [
    {
      "name": "Node.js",
      "version": "v24.13.0",
      "status": "ok"
    }
  ]
}
```

| フィールド | 説明 |
| --- | --- |
| `checkedAt` | チェックを実行した日時（ISO 8601） |
| `results[].name` | ツール名 |
| `results[].version` | 検出されたバージョン（未検出の場合は `null`） |
| `results[].status` | `"ok"` = インストール済み / `"ng"` = 未検出 |
