## Expense-Tracker 老爸的私房錢 【廣志の私帳】
----------------------------
由Express 及 Node.js 製作的記帳小程式
***
## Installation-安裝說明

1. clone本專案
  https://github.com/VanessaLin9/expense-tracker.git
2. 進入專案目錄 expense-tracker
3. 安裝 npm 套件
   npm init -y
   npm i express
   npm i express-handlebars
   npm i body-parser
   npm i mongoose
   npm i method-override
4. 新增種子資料
  npm run seed
5. 啟動專案 
  npm run dev
6. 開啟瀏覽器, 輸入網址 [http://localhost:3000](http://localhost:3000)
***
## Features-專案功能

+ 使用者可以在首頁新增、修改與刪除支出紀錄
+ 使用者可以在首頁一次瀏覽所有支出的清單
+ 使用者可以在首頁看到所有支出清單的總金額
+ 使用者可以在首頁可以根據支出「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和
