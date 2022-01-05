const {Operation, User} = require('../db');

async function getAllOperations(req,res,next) {
    const { userId } = req.params
    try {
        const operations = await Operation.findAll({
            where: {userId: userId},
        })
        if(operations.length >= 10) {
            operations = operations.slice(operations.length-10,operations.length)
        }
        const user = await User.findByPk(userId)
        res.status(200).json({op: operations, user: user})
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
    const { description, amount, type, userId, date } = req.body;
    console.log(req.body)
    try {
        const opCreated = await Operation.create({ description, amount, type, date });
        const user = await User.findByPk(userId);
        await user.addOperation(opCreated)
        if(type === "income") {
            user.balance = parseInt(user.balance) + parseInt(amount)
            await user.save()
        } else {
            user.balance = parseInt(user.balance) - parseInt(amount)
            await user.save()
        }
        await res.status(200).json({opCreated})
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" })
    }
}

async function editOperation(req, res, next) {
    const { id, description, amount, userId } = req.body;
    try {
        const op = await Operation.findOne({ 
            where: { 
                id: id,
                userId: userId, 
            }
        })
        const user = await User.findByPk(userId)
        if(op.type === 'income') {
            user.balance = parseInt(user.balance) - parseInt(op.amount) + parseInt(amount);
            await user.save()
        } else {
            user.balance = parseInt(user.balance) + parseInt(op.amount) - parseInt(amount);
            await user.save()
        }

        op.description = description
        op.amount = amount

        await op.save();
        res.status(200).send(op);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong", error })
    }
}

async function deleteOperation(req, res) {
    const { id } = req.params
    try {
        const op = await Operation.findOne({where: { id: id }})
        const user = await User.findByPk(op.userId)
        if(op.type === 'income') {
            user.balance = parseInt(user.balance) - parseInt(op.amount);
            await user.save()
        } else {
            user.balance = parseInt(user.balance) + parseInt(op.amount);
            await user.save()
        }
        op.destroy();
        res.status(200).send({user, message: 'Operation deleted successfully'});
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong", error })
    }
}

module.exports = {getAllOperations, getOperation, insertOperation, editOperation, deleteOperation};