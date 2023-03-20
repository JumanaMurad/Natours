const fs = require('fs');
const User = require('../models/userModel');
const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`));

//ROUTER HANDELERS
exports.getAllUsers = (req, res) =>
{
    res.status(200).json(
        {
            status: 'success',
            results: users.length,
            data: {
                users
            }
        }
    );
}

exports.getUser = (req, res) =>
{
    console.log(req.params);

    const user = users.find(el => el.id === req.params.id * 1);

    res.status(200).json(
        {
            status: 'success',
            data:
            {
                user
            }
        }
    );
}

exports.createUser = (req, res) =>
{
    const newId = users[users.length - 1]._id + 1;
    const newUser = object.assign({id: newId}, req.body);

    users.push(newUser);
    fs.writeFile(`${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    err => 
    {
        res.status(201).json(
            {
                status: "success",
                data: {
                    user: newUser
                } 
            }
        );
    });
}

exports.updateUser = (req, res) =>
{
    if( req.params.id * 1 > users.length)
    {
        return res.status(404).json(
            {
                status: 'faild',
                message: 'Invalid ID'
            }
        )
    }

    res.status(200).json(
        {
            status: 'success',
            data:
            {
                tour: '<Updated user here...'
            }
        }
    )
}

exports.deleteUser = (req, res) =>
{
    if(req.params.id * 1 > users.length)
    {
        return res.status(404).json(
            {
                status: 'fail',
                message: 'Invalid ID'
            }
        );
    }

    res.status(204).json(
        {
            status: 'success',
            data: null
        }
    );
}
