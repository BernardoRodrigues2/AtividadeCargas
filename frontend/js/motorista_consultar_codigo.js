const btn = document.getElementById('btn_consultar')
const resposta = document.getElementById('resposta')
const dados_motorista = document.getElementById('dados_motorista')
const token = localStorage.getItem('token')

if (!token) {
    location.href = './login.html'
}

btn.addEventListener('click', (e) => {
    e.preventDefault()

    const codigo = document.getElementById('codigo').value

    fetch(`http://localhost:3000/motorista/${codigo}`, {
        method: 'GET',
        headers: { 'Authorization': token }
    })
        .then(res => res.json())
        .then(dados => {
            if (dados.message) {
                resposta.innerHTML = `<p>${dados.message}</p>`
                dados_motorista.innerHTML = ''
                return
            }

            resposta.innerHTML = ''
            dados_motorista.innerHTML = `
                <tr>
                    <td>${dados.codMotorista}</td>
                    <td>${dados.nome}</td>
                    <td>${dados.cnh}</td>
                    <td>${dados.cpf}</td>
                    <td>${dados.telefone}</td>
                </tr>
            `
        })
        .catch(err => {
            console.error('Erro ao consultar motorista:', err)
            resposta.innerHTML = `<p>Erro ao tentar conectar com o servidor.</p>`
        })
})
