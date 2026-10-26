const Motorista = require('../models/Motorista')

const CryptoJs = require('crypto-js')
const Key = 'segredo'

const cadastrar = async (req, res) => {
    const valores = req.body

    if (valores.cpf.length != 11) {
        return res.status(401).json({ message: 'O cpf deve conter exatamente 11 dígitos!' })
    }

    try {
        const cpfCripto = CryptoJs.AES.encrypt(valores.cpf, Key).toString()
        const cnhCripto = CryptoJs.AES.encrypt(valores.cnh, Key).toString()

        await Motorista.create({
            nome: valores.nome,
            cnh: cnhCripto,
            cpf: cpfCripto,
            telefone: valores.telefone
        })

        return res.status(200).json({ message: 'Dados cadastrados com sucesso! ' })

    } catch (err) {
        console.error('Erro ao realizar operação!')
        return res.status(500).json({ message: 'Erro ao realizar operação!' })
    }
}

const listar = async (req, res) => {
    try {
        const motorista = await Motorista.findAll()

        let resultado = []

        motorista.forEach((el) => {
            let cpfDescript = ''
            let cnhDescript = ''

            try {
                const bytes = CryptoJs.AES.decrypt(el.cpf, Key)
                const bytes2 = CryptoJs.AES.decrypt(el.cnh, Key)

                cpfDescript = bytes.toString(CryptoJs.enc.Utf8)
                cnhDescript = bytes2.toString(CryptoJs.enc.Utf8)

            } catch (err) {
                cpfDescript = 'Erro ao descriptografar'
                cnhDescript = 'Erro ao descriptografar'
                console.error(cpfDescript, err)
                console.error(cnhDescript, err)
            }

            resultado.push({
                codMotorista: el.codMotorista,
                nome: el.nome,
                cnh: cnhDescript,
                cpf: cpfDescript,
                telefone: el.telefone
            })
        })
        return res.status(200).json(resultado)

    } catch (err) {
        console.error('Erro ao realizar operação!')
        return res.status(500).json({ message: 'Erro ao realizar operação!' })
    }
}

const consultar = async (req, res) => {
    const id = req.params.id

    try {
        const motorista = await Motorista.findByPk(id)

        if (!motorista) {
            return res.status(404).json({ message: 'Não foram encontrados dados do Motorista' })
        }

        const bytes = CryptoJs.AES.decrypt(motorista.cnh, Key)
        console.log('Bytes =', bytes)

        const bytes2 = CryptoJs.AES.decrypt(motorista.cpf, Key)
        console.log('Bytes =', bytes2)

        const cnhDescript = bytes.toString(CryptoJs.enc.Utf8)
        console.log('Cnh descriptografada =', cnhDescript)

        const cpfDescript = bytes2.toString(CryptoJs.enc.Utf8)
        console.log('Cpf descriptografada =', cpfDescript)

        return res.status(200).json({
            codMotorista: motorista.codMotorista,
            nome: motorista.nome,
            cnh: cnhDescript,
            cpf: cpfDescript,
            telefone: motorista.telefone
        })

    } catch (err) {
        console.error('Erro ao realizar operação!')
        return res.status(500).json({ message: 'Erro ao realizar operação!' })
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body

    try {
        const motorista = await Motorista.findByPk(id)

        if (!motorista) {
            return res.status(404).json({ message: 'Não foram encontrados dados do Motorista' })
        }

        const dadosAtualizados = { ...valores }

        if (valores.cnh) {
            dadosAtualizados.cnh = CryptoJs.AES.encrypt(valores.cnh, Key).toString()
        }

        if (valores.cpf) {
            if (valores.cpf !== 11) {
                return res.status(400).json({ message: 'O Cpf deve conter exatamente 11 caracteres!' })
            }

            dadosAtualizados.cpf = CryptoJs.AES.encrypt(valores.cpf, Key).toString()
        }

        await Motorista.update(dadosAtualizados, {where: { codMotorista: id }})
        return res.status(200).json({ message: 'Dados atualizados com sucesso!'})

    } catch (err) {
        console.error('Erro ao relizar operação!',err)
        return res.status(500).json({ message: 'Erro ao realizar operação!'})
    }
}

const apagar = async (req, res) => {
    const id = req.params.id

    try {
        const motorista = await Motorista.findByPk(id)
        if (!motorista) {
            return res.status(404).json({ message: 'Motorista não encontrado!' })
        }

        await Motorista.destroy({ where: { codMotorista: id } })
        return res.status(200).json({ message: 'Motorista excluído com sucesso!' })
    } catch (err) {
        console.error('Erro ao relizar operação!',err)
        return res.status(500).json({ message: 'Erro ao realizar operação!'})
    }
}

const consultarNome = async (req,res) =>{
    const nome = req.params.nome

    try {
        const motorista = await Motorista.findOne({ where: { nome: nome }})
        if (!motorista) {
            return res.status(404).json({ message: 'Motorista não encontrado!' })
        }  

        const bytes = CryptoJs.AES.decrypt(motorista.cnh, Key)
        const bytes2 = CryptoJs.AES.decrypt(motorista.cpf, Key)

        const cnhDescript = bytes.toString(CryptoJs.enc.Utf8)
        const cpfDescript = bytes2.toString(CryptoJs.enc.Utf8)

        return res.status(200).json({
            codMotorista: motorista.codMotorista,
            nome: motorista.nome,
            cnh: cnhDescript,
            cpf: cpfDescript,
            telefone: motorista.telefone
        })

    } catch (err) {
        console.error('Erro ao relizar operação!',err)
        return res.status(500).json({ message: 'Erro ao realizar operação!'})
    }
}

module.exports = { cadastrar, listar, consultar, atualizar, apagar, consultarNome };