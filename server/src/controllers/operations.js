const {Operation, User} = require('../db');


//In this function we get all the operations from a user taking the user id from the params.
//We use the where attribute to search for the operations that match the user id.
//Then we use the splice method to respond to the client the last 10 operations only.
//The response also includes information about the user because the balance information is super important.
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

// In this function we search for one operation in particular, this helps us for the edition of the operation.
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

// The creation of an operation. We use the information provided to us from the body.
// We create de operation, after that we associate the operation to the user
// Then we add or rest the operation to the balance of the user.
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

// At the edit function of the operation we search for an operation in the database
// After we find it we also look for the user for the modification of the balance.
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

// This is the function that helps us delete particular operations
// After we find the operation we rest or add to the balance of the user
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