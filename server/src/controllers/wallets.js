const {Wallet, Operation, User} = require('../db');

// No tiene uso por ahora.
async function getAllWallets(req,res,next) {
    try {
        const wallets = await Wallet.findAll()
        res.status(200).json({wallets})
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Something went wrong"})
    }
}

// Me sirve para agarrar los datos de la billetera del usuario en especial.
async function getWallet (req, res, next) {
    const { id } = req.params
    console.log('holis')
    try {
        const wallet = await Wallet.findOrCreate({ 
            where: { userId: id},
            include: [{ model: Operation},
                {model: User }
            ]}
        );
        res.status(200).json({wallet})
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong" })
    }
}

module.exports = {getAllWallets, getWallet}