var express = require('express');
var router = express.Router();
var count = 0;
var accountBalance = 100;
var Pessoas = [];
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/pessoas', function (req, res, next) {
  res.status(200).send({ pessoas: Pessoas});
});

/* GET add deposit. */
router.get('/deposit', function (req, res) {
  try {
    accountBalance += parseFloat(req.query.depositValue);
    console.log(accountBalance);

    res.status(200).send({ newAccountBallance: accountBalance, message: "Depósito realizado com sucesso" });
  } catch (error) {
    res.status(400).send("Não foi possível realizar esse depósito. Por favor tente mais tarde");
  }
});
router.get('/depositValor', function (req, res) {
  try {
    var pos = req.query.valor;
    for (i = 0; i < Pessoas.length; i += 1) {
      if (Pessoas[i].id == pos) {
        Pessoas[i].saldo = parseFloat(Pessoas[i].saldo) + parseFloat(req.query.depositValue);
      }
    }

    res.status(200).send({ pessoa: Pessoas, message: "Depósito realizado com sucesso" });
  } catch (error) {
    res.status(400).send("Não foi possível realizar esse depósito. Por favor tente mais tarde");
  }
});

router.get('/saldo', function (req, res) {
  res.status(200).send({ Ballance: accountBalance });
});
router.get('/saldonovo', function (req, res) {
  var id = req.query.id;
  for (i = 0; i < Pessoas.length; i += 1) {
    if(Pessoas[i].id== parseInt(id))
      res.status(200).send({ Ballance: Pessoas[i].saldo });
  }
});
router.get('/cadPessoa', function (req, res) {
  try {
    count += 1;
    p = new Object();
    p.nome = req.query.nome;
    p.CPF = req.query.CPF;
    p.saldo = req.query.saldo;
    p.id = count;
    Pessoas.push(p);
    res.status(200).send({ pessoa: p, message: "Pessoa Adicionada" });
  } catch (error) {
    res.status(400).send("Não foi possível realizar esse depósito. Por favor tente mais tarde");
  }
});
router.get('/verifyPessoa', function (req, res) {
  try {
    if (Array.isArray(Pessoas) && Pessoas.length) {
      res.status(200).send({ cod: 0, pessoa: Pessoas });
    }else
      res.status(200).send({ cod: 1 ,pessoa:[]});
    }catch (error) {
      res.status(400).send("Não foi possível realizar esse depósito. Por favor tente mais tarde");
    }
});
router.get('/saque', function (req, res) {
  try {
    accountBalance -= parseFloat(req.query.SaqueValue);
    console.log(accountBalance);

    res.status(200).send({ newAccountBallance: accountBalance, message: "Saque realizado com sucesso" });
  } catch (error) {
    res.status(400).send("Não foi possível realizar esse Saque. Por favor tente mais tarde");
  }
});
router.get('/saqueValor', function (req, res) {
  try {
    var pos = req.query.valors;
    for (i = 0; i < Pessoas.length; i += 1) {
      if (Pessoas[i].id == pos) {
        Pessoas[i].saldo = parseFloat(Pessoas[i].saldo) - parseFloat(req.query.SaqueValue);
      }
    }
    res.status(200).send({ pessoa: Pessoas, message: "Saque realizado com sucesso" });
  } catch (error) {
    res.status(400).send("Não foi possível realizar esse Saque. Por favor tente mais tarde");
  }
});

module.exports = router;
