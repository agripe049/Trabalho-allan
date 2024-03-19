// routes.js
const express = require('express');
const router = express.Router();
const Pessoa = require('./Pessoa'); // Importe o modelo Pessoa
const { validarCPF } = require('./cpfUtils');

// Rota para criar uma nova pessoa
router.post('/pessoa', async (req, res) => {

  
  try {
    if (!validarCPF(req.body.cpf)){
        res.status(403).send({error: "Cpf Invalido"})
        return
    }
    const pessoa = await Pessoa.create(req.body);

    res.json(pessoa);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Rota para buscar todas as pessoas
router.get('/pessoas', async (req, res) => {
  try {
    const pessoas = await Pessoa.findAll(); // Utilize o modelo Pessoa
    res.json(pessoas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para buscar uma pessoa pelo CPF
router.get('/pessoa/:cpf', async (req, res) => {
  const pessoa = await Pessoa.findOne({ where: { cpf: req.params.cpf } });
  if (!pessoa) {
    return res.status(404).json({ error: 'Pessoa não encontrada' });
  }
  res.json(pessoa);
});

// Rota para atualizar uma pessoa pelo CPF
router.put('/pessoa/:cpf', async (req, res) => {
  try {
    const [updated] = await Pessoa.update(req.body, { where: { cpf: req.params.cpf } });
    if (updated) {
      const pessoa = await Pessoa.findOne({ where: { cpf: req.params.cpf } });
      return res.json(pessoa);
    }
    throw new Error('Pessoa não encontrada');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Rota para excluir uma pessoa pelo CPF
router.delete('/pessoa/:cpf', async (req, res) => {
  try {
    const deleted = await Pessoa.destroy({ where: { cpf: req.params.cpf } });
    if (deleted) {
      return res.json({ message: 'Pessoa excluída com sucesso' });
    }
    throw new Error('Pessoa não encontrada');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
