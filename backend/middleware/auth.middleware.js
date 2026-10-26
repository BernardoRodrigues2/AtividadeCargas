const CryptoJs = require('crypto-js')
const Key = 'segredo'

function authMiddleware (req,res, next) {
    const token = req.headers['authorization']
    console.log('Token de acesso: ',token)

    if(!token){
        return res.status(401).json({ message: 'Acesso negado! Token não fornecido'})
    }

    try {
        const bytes = CryptoJs.AES.decrypt(token, Key)
        const dadosDescript = bytes.toString(CryptoJs.enc.Utf8)

        if(!dadosDescript){
            return res.status(401).json({ message: 'Token inválido!'})
        }

        const payload = JSON.parse(dadosDescript)

        if(Date.now() > payload.expiraEm){
            return res.status(401).json({ message: 'Sessão expirada! Faça o login novamente!'})
        }

        req.funcionario = payload
        next()

    } catch (err) {
        return res.status(500).json({ message: 'Falha na autenticação do token! '})
    }
}

module.exports = authMiddleware