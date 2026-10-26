const btn = document.getElementById('btn_cadastrar')
const resposta = document.getElementById('resposta')
const token = localStorage.getItem('token')

if (!token) {
    location.href = './login.html'
}

btn.addEventListener('click', (e) => {
    e.preventDefault()

    const cidade = document.getElementById('cidade').value
    const status = document.getElementById('status').value
    const data = document.getElementById('data').value
    const hora = document.getElementById('hora').value
    const idCarga = document.getElementById('idCarga').value

    const valores = {
        cidade: cidade,
        status: status,
        data: data,
        hora: hora,
        idCarga: idCarga
    }

    fetch('http://localhost:3000/entrega', {
        method: 'POST',
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
            console.error('Erro ao cadastrar entrega:', err)
            resposta.innerHTML = `<p>Erro ao tentar conectar com o servidor.</p>`
        })
})
