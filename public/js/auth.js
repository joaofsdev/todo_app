document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('login-form');
    const formCadastro = document.getElementById('cadastro-form');
    const mostrarCadastro = document.getElementById('mostrar-cadastro');
    const mostrarLogin = document.getElementById('mostrar-login');
    const mensagem = document.getElementById('mensagem');

    mostrarCadastro.addEventListener('click', () => {
        document.getElementById('form-login').classList.add('hidden');
        document.getElementById('form-cadastro').classList.remove('hidden');
    });

    mostrarLogin.addEventListener('click', () => {
        document.getElementById('form-cadastro').classList.add('hidden');
        document.getElementById('form-login').classList.remove('hidden');
    });

    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                window.location.href = '/dashboard.html';
            } else {
                mensagem.textContent = data.mensagem;
            }
        } catch (error) {
            mensagem.textContent = 'Erro ao conectar com o servidor';
        }
    });

    formCadastro.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email-cadastro').value;
        const senha = document.getElementById('senha-cadastro').value;

        try {
            const response = await fetch('/api/auth/registrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, email, senha })
            });
            const data = await response.json();

            if (response.ok) {
                mensagem.textContent = 'Cadastro realizado! Faça login.';
                document.getElementById('form-cadastro').classList.add('hidden');
                document.getElementById('form-login').classList.remove('hidden');
            } else {
                mensagem.textContent = data.mensagem;
            }
        } catch (error) {
            mensagem.textContent = 'Erro ao conectar com o servidor';
        }
    });
});