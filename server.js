
var http = require('http')
var url = require('url');
var fs = require('fs')
var mysql = require('mysql');

http.createServer(function (req, res) {
  var body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    var q = url.parse("http://localhost:8080/?" + body, true).query;
    responseFile = "/Users/Bernardo/Desktop/js_teste/hello.html"
    if (!q.nome || !q.email || !q.pass)
    {
        responseFile = "/Users/Bernardo/Desktop/js_teste/signin.html"
    }
    else {
        var con = mysql.createConnection({
            host: "localhost",
            user: "teste",
            password: "teste@nuncavaisdescobrir",
            database: "teste"
            })
        
        con.connect(function(err) {
            if (!err)
              console.log("Connected!");
            else
            {
                console.log("Não consegui ligar essa porra!");
                return
            }
        
            con.query("INSERT INTO `teste`.`perfil` (`email`, `pass`, `nome`, `idade`, `local`) VALUES ('" + q.email + "','" + q.pass + "','" + q.nome + "', '28', 'porto');", function (err, result) {
                if (err) throw err;
            });
        
            con.end(function(err) {
                if (err) {
                  console.log('mnmnnerror:' + err.message);
                }
                console.log('Closed the database connection.');
              });
            })
            console.log("O utilizador x foi registado na base de dados")
    }
    fs.readFile(responseFile, function (err,data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        else
        {
            res.writeHead(200);
            // TODO: mudar o html a ser enviado para ter nome e email do utilizador
            res.end(data);
        }
    });
  });
}).listen(8080);



