const users = require('../models/users')

let id = 1

const login = (req, res) => {
    const {username, password} = req.body

    //check if username is in the file
    const user = users.filter(user => user.username === username)[0]
    if(user) {
        if(user.password === password) {
            req.session.user.username = username
            res.status(200).send(req.session.user)
        } else res.status(403).send('Incorrect Password')
    } else res.status(403).send('User Does Not Exist')
        
}

const register = (req, res) => {
    const {username, password} = req.body
    users.push({id, username, password})
    req.session.user.username = username
    id++
    
    res.status(200).send(req.session.user)
}

const signout = (req, res) => {
    req.session.destroy()
    res.status(200).send(req.session)
}

const getUser = (req, res) => {
    res.status(200).send(req.session.user)
}

module.exports = {
    login,
    register,
    signout,
    getUser
}