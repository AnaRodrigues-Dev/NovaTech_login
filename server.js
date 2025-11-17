// Importa os módulos necessários
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Cria a aplicação Express
const app = express();
const PORT = 3000;

// Configurações de middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve arquivos estáticos da raiz do projeto
app.use(express.static(__dirname));

// Adiciona headers CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    next();
});

// Base de dados simulada
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

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota de login (API)
app.post('/api/login', (req, res) => {
    const { email, password, remember } = req.body;
    
    console.log('Tentativa de login:', { email, remember });
    
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email e senha são obrigatórios'
        });
    }
    
    const usuario = usuarios.find(u => u.email === email && u.password === password);
    
    if (usuario) {
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
        return res.status(401).json({
            success: false,
            message: 'Email ou senha incorretos'
        });
    }
});

// Rota de status
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