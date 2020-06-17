var express = require('express');
var router = express.Router();

var accountBalance = 100;
var amov=''
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', accountBalance: accountBalance,amov:amov });
});

/* GET add deposit. */
router.get('/deposit', function(req, res) {
  try {    
    accountBalance += parseFloat(req.query.depositValue);
    console.log(accountBalance);
    amov+=' <div style="color:DarkGreen"> Depositado:'+parseFloat(req.query.depositValue)+'</div>';
    res.status(200).send({newAccountBallance: accountBalance,newAmov:amov , message: "Depósito realizado com sucesso"});
  } catch (error) {
    res.status(400).send("Não foi possível realizar esse depósito. Por favor tente mais tarde");
  }
});

router.get('/saque', function(req, res) {
  try {    
    var vlsaque=parseFloat(req.query.saqueValue);
    if (vlsaque<=accountBalance) {
      accountBalance -= parseFloat(req.query.saqueValue);
      amov+='<div style="color:DarkRed"> Sacado:'+vlsaque+'</div>';
      console.log(accountBalance);
      res.status(200).send({newAccountBallance: accountBalance,newAmov:amov, message: "Saque realizado com sucesso"});
    }
    else {
      res.status(200).send({newAccountBallance: accountBalance,newAmov:amov, message: "Saldo Insufuciente"});
      console.log("Saldo Insufuciente");
    };  
  } catch (error) {
    res.status(400).send("Não foi possível realizar esse Saque. Por favor tente mais tarde");
  }
});

module.exports = router;
