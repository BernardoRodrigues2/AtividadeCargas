const btn = document.getElementById('btn_cadastrar')
const resposta = document.getElementById('resposta')
const token = localStorage.getItem('token')

if (!token) {
    location.href = './login.html'
}

btn.addEventListener('click', (e) => {
    e.preventDefault()

    const descricao = document.getElementById('descricao').value
    const peso = document.getElementById('peso').value
    const volume = document.getElementById('volume').value
    const codRastreio = document.getElementById('codRastreio').value
    const idMotorista = document.getElementById('idMotorista').value

    const valores = {
        descricao: descricao,
        peso: peso,
        volume: volume,
        codRastreio: codRastreio,
        idMotorista: idMotorista
    }

    fetch('http://localhost:3000/carga', {
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
            console.error('Erro ao cadastrar carga:', err)
            resposta.innerHTML = `<p>Erro ao tentar conectar com o servidor.</p>`
        })
})
