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

/* GET add deposit. */
router.get('/saque', function(req, res) {
  try {    
    if (req.query.saque>accountBalance){
      res.status(200).send({message:"você não possui saldo suficiente"})
    }else {
    accountBalance -= parseFloat(req.query.saque);
    console.log(accountBalance);
    
    res.status(200).send({newAccountBallance: accountBalance, message: "saque realizado com sucesso"});
    }
  } catch (error) {
    res.status(400).send("Não foi possível realizar esse depósito. Por favor tente mais tarde");
  }
  
});



module.exports = router;
