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

/* GET add saque. */
router.get('/saque', function(req, res) {
  try {
    var vlSaque = req.query.saqueValue;
    var message = ''
    if (accountBalance < vlSaque){
      message = 'Saldo Insificiente';
    }else{
      accountBalance -= parseFloat(vlSaque);
      message = 'Saque realizado com sucesso. Seu novo saldo é de ' + accountBalance + '.';
    }
    console.log(accountBalance);
    res.status(200).send({newAccountBallance: accountBalance, message: message});
  } catch (error) {
    res.status(400).send("Não foi possível realizar esse depósito. Por favor tente mais tarde");
  }
});


module.exports = router;
