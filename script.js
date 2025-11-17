// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Seleciona os elementos do formulário
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');
    
    // Adiciona evento de submit ao formulário
    loginForm.addEventListener('submit', async function(e) {
        // Previne o comportamento padrão do formulário
        e.preventDefault();
        
        // Pega os valores dos campos
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        // Limpa mensagens anteriores
        messageDiv.className = 'message';
        messageDiv.textContent = '';
        
        try {
            // Faz a requisição para o servidor Node.js
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    remember: remember
                })
            });
            
            // Converte a resposta para JSON
            const data = await response.json();
            
            // Verifica se o login foi bem-sucedido
            if (data.success) {
                showMessage('✓ Login realizado com sucesso!', 'success');
                
                // Simula redirecionamento após 1.5 segundos
                setTimeout(() => {
                    console.log('Usuário autenticado:', data.user);
                    // Aqui você redirecionaria para a dashboard
                    // window.location.href = '/dashboard.html';
                }, 1500);
            } else {
                // Mostra mensagem de erro
                showMessage('✗ ' + (data.message || 'Erro ao fazer login'), 'error');
            }
            
        } catch (error) {
            // Trata erros de conexão
            console.error('Erro:', error);
            showMessage('⚠ Servidor offline. Inicie com: npm start', 'error');
        }
    });
    
    // Função para exibir mensagens
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `message ${type}`;
    }
});