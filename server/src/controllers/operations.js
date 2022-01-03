const {Operation, User} = require('../db');

async function getAllOperations(req,res,next) {
    const { userId } = req.params
    try {
        const operations = await Operation.findAll({where: {userId: userId}})
        res.status(200).json(operations)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong", err })
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
    const { description, monto, tipo, userId } = req.body;
    try {
        const opCreated = await Operation.create({ description, monto, tipo });
        const user = await User.findByPk(userId);
        await user.addOperation(opCreated)
        if(tipo === "ingreso") {
            user.balance = user.balance + monto
            await user.save()
        } else {
            user.balance = user.balance - monto
            await user.save()
        }
        await res.status(200).json({opCreated})
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" })
    }
}

module.exports = {getAllOperations, getOperation, insertOperation}