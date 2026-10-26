const btn = document.getElementById('btn_atualizar')
const resposta = document.getElementById('resposta')
const token = localStorage.getItem('token')

if (!token) {
    location.href = './login.html'
}

btn.addEventListener('click', (e) => {
    e.preventDefault()

    const codigo = document.getElementById('codigo').value
    const nome = document.getElementById('nome').value
    const cnh = document.getElementById('cnh').value
    const cpf = document.getElementById('cpf').value
    const telefone = document.getElementById('telefone').value

    const valores = {
        nome: nome,
        cnh: cnh,
        cpf: cpf,
        telefone: telefone
    }

    fetch(`http://localhost:3000/motorista/${codigo}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(valores)
    })
        .then(res => res.json())
        .then(dados => {
            resposta.innerHTML = `<p>${dados.message}</p>`
        })
        .catch(err => {
            console.error('Erro ao atualizar motorista:', err)
            resposta.innerHTML = `<p>Erro ao tentar conectar com o servidor.</p>`
        })
})
