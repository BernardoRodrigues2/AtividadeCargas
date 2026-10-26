const Funcionario = require('../models/Funcionario')

const CryptoJs = require('crypto-js')
const Key = 'segredo'

const cadastrar = async (req, res) => {
    const valores = req.body

    try {
        const senhaCripto = CryptoJs.AES.encrypt(valores.senha, Key).toString()

        await Funcionario.create({
            nome: valores.nome,
            email: valores.email,
            senha: senhaCripto,
        })

        return res.status(200).json({ message: 'Dados cadastrados com sucesso! ' })

    } catch (err) {
        console.error('Erro ao realizar operação!')
        return res.status(500).json({ message: 'Erro ao realizar operação!' })
    }
}

module.exports = { cadastrar };