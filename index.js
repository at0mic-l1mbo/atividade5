const express = require('express');
const app = express();

let estoque = [];

app.get('/adicionar/:id/:nome/:qtd', (req, res) => {
    const { id, nome, qtd } = req.params;
    estoque.push({ id, nome, qtd });
    res.send(`Produto ${nome} adicionado ao estoque.`);
});

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname })
})

app.get('/listar', (req, res) => {
    res.send(estoque);
});

app.get('/remover/:id', (req, res) => {
    const { id } = req.params;
    estoque = estoque.filter(produto => produto.id !== id);
    res.send(`Produto com id ${id} removido do estoque.`);
});

app.get('/editar/:id/:qtd', (req, res) => {
    const { id, qtd } = req.params;
    estoque = estoque.map(produto => {
        if (produto.id === id) {
            produto.qtd = qtd;
        }
        return produto;
    });
    res.send(`Quantidade do produto com id ${id} alterada para ${qtd}.`);
});

app.listen(3000, () => {
    console.log('Aplicativo rodando na porta 3000');
});
