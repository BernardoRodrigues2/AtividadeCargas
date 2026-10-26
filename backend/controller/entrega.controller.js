const Entrega = require('../models/Entrega')

const cadastrar = async (req, res) => {
    const valores = req.body

    try {
        await Entrega.create({
            cidade: valores.cidade,
            status: valores.status,
            data: valores.data,
            hora: valores.hora,
            idCarga: valores.idCarga,
        })

        return res.status(200).json({ message: 'Dados cadastrados com sucesso! ' })

    } catch (err) {
        console.error('Erro ao realizar operação!')
        return res.status(500).json({ message: 'Erro ao realizar operação!' })
    }
}

const listar = async (req,res) =>{
    try {
        const entrega = await Entrega.findAll()

        if(!entrega){
            return res.status(404).json({ message: 'Não foram encontrados os dados da entrega!'})
        }

        return res.status(200).json(entrega)
    } catch (err) {
        console.error('Erro ao realizar operação!')
        return res.status(500).json({ message: 'Erro ao realizar operação!' })   
    }
}

module.exports = { cadastrar, listar };