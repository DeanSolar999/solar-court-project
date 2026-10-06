# Solar Court Project｜曜日羽球場地募集

曜日羽球團 Solar Badminton 的 2027 年場地募集活動網站。

預定 GitHub Pages 網址：<https://deansolar999.github.io/solar-court-project/>

## 目前功能

- 活動公告、抽獎獎品、球團福利、場地與個資告知。
- MIZUNO FORTIUS 11 POWER 頭獎圖片與可展開規格。
- 手機與桌機排版。
- 表單內容預覽與欄位格式檢查。

**此版本尚未正式收件。** GitHub Pages 只提供靜態網站，這份儲存庫沒有報名 API，不會把表單內容傳送到 Google Sheets 或其他服務，也不在瀏覽器保存填寫資料。發布網站不等於開放收件。

## 本機使用

需求：Node.js 22.13 或更新版本、npm。

```sh
npm ci
npm run dev
```

建立正式靜態檔：

```sh
npm run build
npm run preview
```

部署檔位於 `dist/`，網站基底路徑是 `/solar-court-project/`。變更儲存庫名稱時，也必須同步調整基底路徑、canonical 與分享預覽網址。

## 自動部署

在 GitHub 儲存庫的 Settings → Pages 將 Source 設為 GitHub Actions。推送至 `main` 或手動執行 `Deploy GitHub Pages` 工作流程後，會安裝鎖定的依賴、建置、上傳靜態檔並部署。

請以成功的 GitHub Actions 工作流程、Pages 部署狀態與實際網站讀回確認發布完成，不要只以本機建置成功判定。

## 資料與安全

- 不要上傳 `.env`、API 密鑰、登入憑證、參加者名單、Google Sheets 匯出檔或測試個資。
- 本儲存庫不包含 Apps Script 程式、試算表識別碼或 Sites 的伺服器設定。
- 若未來開放收件，須另外部署安全後端，完成伺服器端驗證、金鑰保管、濫用防護、通知與保存規則，再進行端到端測試。
- 既有 Sites 網站與 Google Sheets 不會因這個靜態版本而被變更。

## 素材

球拍圖片由活動主辦方提供，圖片同時展示 QUICK 與 POWER；本次頭獎只有 FORTIUS 11 POWER 一支。相關商標與圖片權利屬原權利人所有。
