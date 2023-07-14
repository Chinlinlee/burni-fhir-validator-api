# burni-fhir-validator-api

利用 [node-java-bridge](https://github.com/MarkusJx/node-java-bridge) 所重寫的 [node-java-fhir-validator](https://github.com/Chinlinlee/node-java-fhir-validator) 搭建與 [fhir-validator-wrapper
](https://github.com/inferno-framework/fhir-validator-wrapper) 相似的 Node.js REST API Server

# 環境所需
- Node.js >= 16
- JAVA JDK >= 11

# 設定
## .env 檔案
- 路徑: `.env`
- 請記得自行創建 `.env` 檔案或複製貼上 `.env.example` 並重新命名 `.env`
- 內容:
```text
PORT=3000
HOST="0.0.0.0"
```
### 設定變數說明

環境名稱 | 資料型態 | 說明
---------|----------|---------
 PORT | number | Server 所使用(監聽)的 port
 HOST | string | Server 所使用(監聽)的 host

# 啟動
- 使用以下指令啟動

```bash
npm run start
```