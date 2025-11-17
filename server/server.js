// Importa os módulos necessários
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Cria a aplicação Express
const app = express();
const PORT = 3000;

// Configurações de middlewares
app.use(bodyParser.json()); // Para processar JSON
app.use(bodyParser.urlencoded({ extended: true })); // Para processar formulários

// Serve arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, '../public')));

// Adiciona headers CORS para permitir requisições
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    next();
});

// Base de dados simulada (em produção, use um banco de dados real)
const usuarios = [
    {
        id: 1,
        nome: 'Administrador',
        email: 'admin@novatech.com',
        password: 'admin123'
    },
    {
        id: 2,
        nome: 'Usuário Teste',
        email: 'usuario@novatech.com',
        password: 'teste123'
    }
];

// Rota principal - serve o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Rota de login (API)
app.post('/api/login', (req, res) => {
    // Pega os dados enviados pelo formulário
    const { email, password, remember } = req.body;
    
    // Log para debug
    console.log('Tentativa de login:', { email, remember });
    
    // Valida se os campos foram preenchidos
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email e senha são obrigatórios'
        });
    }
    
    // Busca o usuário no banco de dados simulado
    const usuario = usuarios.find(u => u.email === email && u.password === password);
    
    // Verifica se encontrou o usuário
    if (usuario) {
        // Login bem-sucedido
        return res.json({
            success: true,
            message: 'Login realizado com sucesso',
            user: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });
    } else {
        // Credenciais inválidas
        return res.status(401).json({
            success: false,
            message: 'Email ou senha incorretos'
        });
    }
});

// Rota para teste (verifica se o servidor está rodando)
app.get('/api/status', (req, res) => {
    res.json({
        status: 'online',
        message: 'Servidor NovaTech está funcionando!'
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log('=================================');
    console.log('🚀 Servidor NovaTech iniciado!');
    console.log(`📍 Acesse: http://localhost:${PORT}`);
    console.log('=================================');
});
