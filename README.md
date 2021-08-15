## Expense-Tracker 老爸的私房錢 【廣志の私帳】
----------------------------
由Express 及 Node.js 製作的記帳小程式
***
## Installation-安裝說明

1. clone本專案
```
 https://github.com/VanessaLin9/expense-tracker.git
```
2. 進入專案目錄 
```
  expense-tracker
```
3. 安裝相關套件
```
 npm i
```
4. 新增種子資料
```
 npm run seed
```
5. 環境相關參數請修改此檔案(去除.sample副檔名)
```
  .env.sample
```
6. 啟動專案
``` 
    npm run dev
```
7. 開啟瀏覽器, 輸入網址 
     [http://localhost:3000](http://localhost:3000)
***
## Heroku 網頁試用版

請點連結 [https://still-thicket-01611.herokuapp.com/](https://still-thicket-01611.herokuapp.com/users/login)

***
## Seed User-試用帳密
+ email: root@example.com
+ password: 12345678

***
## Features-專案介紹

![首頁](https://imgur.com/nwfQuNM.jpg)

+ 使用者認證功能
+ 使用者可以在首頁新增、修改與刪除支出紀錄
+ 使用者可以在首頁一次瀏覽所有支出的清單
+ 使用者可以在首頁看到所有支出清單的總金額
+ 使用者可以在首頁可以根據支出「類別」與「月份」來篩選支出；總金額的計算只會包括被篩選出來的支出總和
