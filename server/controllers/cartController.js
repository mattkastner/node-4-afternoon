const swag = require('../models/swag')

const add = (req, res) => {
    const {id} = req.params
    let {user} = req.session

    console.log('add')

    let index = user.cart.findIndex(item => item.id == id)
    if(index !== -1) {
        console.log(user)
        res.status(200).send(user)
    } else {
        const selectedSwag = swag.find(swag => swag.id == id)

        user.cart.push(selectedSwag)
        user.total += selectedSwag.price
        console.log(user)
        res.status(200).send(user)
    }
}

const deleteUser = (req, res) => {
    const {id} = req.params

    const swagIndex = req.session.cart.findIndex(item => item.id == id)
    const selectedSwag = swag.find(swag => swag.id == id)

    if (swagIndex !== -1){
        req.session.splice(swagIndex, 1)
        user.total -= selectedSwag.price
    }
    res.status(200).send(user)
}

const checkout = (req, res) => {
    let {user} = req.session
    user.cart = []
    user.total = 0

    res.status(200).send(user)
}

module.exports = {
    add,
    deleteUser,
    checkout
}