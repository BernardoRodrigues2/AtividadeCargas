const { Motorista, Entrega, Carga, Funcionario } = require('./models/rel')

const conn = require('./db/conn')

async function syncDataBase() {
    try {
        await conn.sync({ force: true })
        console.log('Tabelas sincronizadas!')

    } catch (err) {
        console.error('Erro ao sincronizar as tabelas!',err)

    }finally{
        await conn.close()
        console.log('Fechando conexão com o banco de dados!')
    }
    
}

syncDataBase()