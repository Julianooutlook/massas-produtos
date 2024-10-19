document.getElementById('submit').addEventListener('click', () => {
   
    const usuario = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    
    };

 
    fetch(`https://api-produtos-sage.vercel.app/`, {
        method: 'POST',
        headers: {            
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario)
    })
    .then(response => response.json())
    .then(data => {
    
        const token = data.token;
        const textoCodigo = document.getElementById('codigoRecebido');


        if (token) {
            textoCodigo.value = token;
        } else {
            console.error('erro ao receber jwt');
        }

        document.getElementById('response').innerHTML = data.message || 'Login realizado com sucesso!';

        
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById('response').innerHTML = 'Erro ao realizar login';
    });
});

document.querySelector("#botaoCopiar").addEventListener('click', () => {
    const textoCodigo = document.getElementById('codigoRecebido');

    navigator.clipboard.writeText(textoCodigo.value)
    .then(() => {
        const copiarTexto = document.querySelector("#codCopiado").innerText = "Códido copiado!";

        if (copiarTexto) {
            setTimeout(() => {
                window.location.reload();
            }, 20000);
        } else {
            copiarTexto.innerText = 'Erro ao copiar código'
        }
    })


    .catch(err => {
        document.querySelector("#codCopiado").innerHTML = "Erro ao copiar código", err;
    });
});

