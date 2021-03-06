// importar a dependencia do sqlite3

const sqlite3 = require("sqlite3").verbose()

//criar objeto operacional no DB
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//utilizar banco de dados
 /* db.serialize(() => {
    
    //criar tabela (crase para quebrar a linha)
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    //inserir dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address, 
            address2,
            state, 
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1401&q=80",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "N° 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e Papelão"
    ]

    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
    }

    db.run(query, values, afterInsertData)

    //consultar dados
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        console.log("Aqui estão seus registros:")
        console.log(rows)
    })
    
    //deletar dado da tabela
    db.run(`DELETE FROM places WHERE ID = ?`, [5], function(err){
        if(err) {
            return console.log(err)
        }
        console.log("Registro deletado com sucesso!")
    })

}) 
 */