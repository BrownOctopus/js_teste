
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "teste",
  password: "teste@nuncavaisdescobrir",
  database: "teste"
})

function connected(err)
{
    if (!err)
      console.log("Connected!");
    else
    {
        console.log("Não consegui ligar essa porra!");
        return
    }

    con.query("SELECT evento.nome, perfil.nome as criador FROM evento INNER JOIN perfil ON evento.criador = perfil.idperfil", function (err, result, fields) {
        if (err) throw err;
        result.forEach(r => {
            str = ""
            fields.forEach(e => {
                 str += e.name + ": " + r[e.name] + ", "
             });
            console.log(str)
        });
    });

        con.query("SELECT evento.nome FROM evento WHERE criador=" + 2, function (err, result, fields) {
            if (err) throw err;
            str = ""
            result.forEach(r => {
                fields.forEach(e => {
                     str += r[e.name] + ", "
                 });
            });
            console.log("Eventod do  puto: " + str)
    });

    con.end(function(err) {
        if (err) {
          console.log('mnmnnerror:' + err.message);
        }
        console.log('Closed the database connection.');
      });
}

con.connect(connected)
