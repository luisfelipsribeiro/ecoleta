const express = require("express")
const server = express()

// buscar banco de dados
const db = require("./database/db.js")

//configurar pasta publica (estático)
server.use(express.static("public"))

//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))


//Utilizar template engine
const nunjuks = require("nunjucks")
nunjuks.configure("src/views", {
    express: server,
    noCache: true
})


//configurar rota index
server.get("/", (req, res) => {
    return res.render("index.html")
})

//configurar rota create-point
server.get("/create-point", (req, res) => {

    console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    //req.body = corpo do formulário
    console.log(req.body)

    //inserir dados no banco de dados
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
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)

})


//configurar rota search-results
server.get("/search-results", (req, res) => {

    const search = req.query.search

    if (search == "") {
        return res.render("search-results.html", { total: 0 })
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length

        return res.render("search-results.html", { places: rows, total: total })
    })


})


//ligar servidor
server.listen(3000)
