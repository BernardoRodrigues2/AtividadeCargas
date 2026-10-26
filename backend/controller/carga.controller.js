const Carga = require('../models/Carga')

const cadastrar = async (req, res) => {
    const valores = req.body

    try {
        await Carga.create({
            descricao: valores.descricao,
            peso: valores.peso,
            volume: valores.volume,
            codRastreio: valores.codRastreio,
            idMotorista: valores.idMotorista,
        })

        return res.status(200).json({ message: 'Dados cadastrados com sucesso! ' })
    } catch (err) {
        console.error('Erro ao realizar operação!')
        return res.status(500).json({ message: 'Erro ao realizar operação!' })
    }
}

module.exports = { cadastrar };