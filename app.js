const express = require("express");

const app = express();

const PORT = process.env.PORT || 80

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({extended: false});

app.use(express.json())
app.use(express.urlencoded({extended: false}));
  
app.use("/", express.static('./public'));
app.post("/", urlencodedParser, function (request, response) {
if(request.body.login == "Toryn" && request.body.password == "32167")
{
console.log("Success!");
return response.sendFile(__dirname + '/public/add_page.html');
}

else
{
console.log("Failure!");
return response.sendStatus(400);
}
response.send();
});

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

app.listen(PORT, ()=>console.log("Сервер запущен..."));