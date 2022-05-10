const express = require("express");
   
const app = express();
   
// создаем парсер для данных application/x-www-form-urlencoded
app.use(express.json())
app.use(express.urlencoded({extended: false}));
  
app.use("/", express.static('./public'));

app.post("/login", (request, response) => {
    if(!request.content) return response.sendStatus(400);
    console.log(request.content);
    response.send(`${request.content.login} - ${request.content.password}`);
});
   
app.listen(3000, () => console.log("Сервер запущен..."));