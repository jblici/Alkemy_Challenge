const {Wallet} = require('../db');

function getAllWallets(req,res,next) {
    return Wallet.findAll()
    .then((wallets) => res.send(wallets))
    .catch((err) => next(err))
}

function getWallet (req, res, next) {
    console.log('category id')
}

module.exports = {getAllWallets, getWallet}