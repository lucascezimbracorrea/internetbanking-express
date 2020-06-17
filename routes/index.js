var express = require('express');
var router = express.Router();

var accountBalance = 0;

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
router.get('/sak', function(req, res) {
  try {
    if(accountBalance < req.query.depositValue){
      res.status(400).send({newAccountBallance: accountBalance, message: "Valor insufuciente, tente um valor menor!"}); 
    } else 
      accountBalance -= parseFloat(req.query.depositValue);
      console.log(accountBalance);

      res.status(200).send({newAccountBallance: accountBalance, message: "Saque realizado com sucesso"});   
  } catch (error) {
    res.status(400).send({message: "Não foi possível realizar esse Saque. Por favor tente mais tarde"});
  }
});

module.exports = router;
