var express = require('express');
var router = express.Router();

var accountBalance = 100;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', accountBalance: accountBalance });
});

/* GET add deposit. */
router.get('/deposit', function(req, res) {
  try {    
    accountBalance += parseFloat(req.query.depositValue);
    console.log(accountBalance);
    
    res.status(200).send({newAccountBallance: accountBalance, message: "Depósito realizado com sucesso"});
  } catch (error) {
    res.status(400).send("Não foi possível realizar esse depósito. Por favor tente mais tarde");
  }
});

router.get('/withdraw', function(req, res) {
  try {    
    accountBalance -= parseFloat(req.query.withdrawValue);
    console.log(accountBalance);
    
    res.status(200).send({newAccountBallance: accountBalance, message: "Saque realizado com sucesso"});
  } catch (error) {
    res.status(400).send("Não foi possível realizar esse depósito. Por favor tente mais tarde");
  }
});

router.get('/balance', function(req, res){
  try{
    res.status(200).send({ accountBalance: accountBalance });
  } catch (error) {
    res.status(400).send("Não foi possível consultar o saldo!");
  }
});

module.exports = router;
