const btn = document.getElementById('btn_apagar')
const resposta = document.getElementById('resposta')
const token = localStorage.getItem('token')

if (!token) {
    location.href = './login.html'
}

btn.addEventListener('click', (e) => {
    e.preventDefault()

    const codigo = document.getElementById('codigo').value

    fetch(`http://localhost:3000/motorista/${codigo}`, {
        method: 'DELETE',
        headers: { 'Authorization': token }
    })
        .then(res => res.json())
        .then(dados => {
            resposta.innerHTML = `<p>${dados.message}</p>`
        })
        .catch(err => {
            console.error('Erro ao excluir motorista:', err)
            resposta.innerHTML = `<p>Erro ao tentar conectar com o servidor.</p>`
        })
})
