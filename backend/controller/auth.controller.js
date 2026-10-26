const Funcionario = require('../models/Funcionario')

const CryptoJs = require('crypto-js')
const Key = 'segredo'

const login = async (req,res) =>{
    const valores = req.body

    if(!valores.email || !valores.senha){
        return res.status(400).json({ message: 'Preencha os campos necessarios! '})
    }

    try {
        const funcionario = await Funcionario.findOne({ where: { email: valores.email }})

        if(!funcionario){
            return res.status(401).json({ message: 'Não foram encontrados dados do Funcionario'})
        }

        const bytes = CryptoJs.AES.decrypt(funcionario.senha, Key)
        console.log(bytes)

        const senhaBd = bytes.toString(CryptoJs.enc.Utf8)
        console.log(senhaBd)

        if(valores.senha !== senhaBd){
            return res.status(401).json({ message: 'Senha incorreta!' })
        }

        const tresHorasEmMs = 3 * 60 * 60 * 1000
        const tempoExpira = Date.now() + tresHorasEmMs

        const payload = {
            idFuncionario: funcionario.codFuncionario,
            nome: funcionario.nome,
            expiraEm: tempoExpira
        }

        const token = CryptoJs.AES.encrypt(JSON.stringify(payload), Key).toString()

        return res.status(200).json({
            message: 'Login realizado com sucesso',
            token: token,
            nome: funcionario.nome
        })

    } catch (err) {
        console.error('Erro ao realizar operação! ',err)
        return res.status(500).json({ message: 'Erro ao realizar operação! '})
    }
}

module.exports = { login };