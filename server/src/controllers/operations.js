const {Operation, User, Wallet} = require('../db');

async function getAllOperations(req,res,next) {
    const { id } = req.params
    try {
        const user = await User.findByPk(id)
        const operations = await Operations.findAll({where: {userId: user.id}})
        res.status(200).json(operations)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong" })
    }
    
}

async function getOperation (req, res, next) {
    const { id } = req.params;
    try {
        const operation = await Operation.findByPk(id);
        res.status(200).json(operation)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong" })
    }
}

async function insertOperation(req,res, next) {
    const { description, monto, tipo, userId, walletId } = req.body;
    try {
        let balance
        const opCreated = await Operation.findOrCreate({ where: { description, monto, tipo, userId, walletId } });
        const wallet = await Wallet.findByPk(walletId);
        if(tipo === "ingreso") balance = wallet.balance += monto
        balance = wallet.balance -= monto
        const updatedWallet = await wallet.update(balance)
        res.status(200).json({opCreated, wallet})
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" })
    }
}

module.exports = {getAllOperations, getOperation, insertOperation}