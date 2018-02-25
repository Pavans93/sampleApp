const express = require('express');
const router = express.Router();
const User = require('../pojo/user');
const app = express();

router.get('/users', (req, res, next) => {
    User.find(function (err, users) {
        res.json(users);
    })
});

router.delete('/user/:id', (req, res, next) => {

    User.remove({ _id: req.params.id }, function (err, result) {
        if (err) {
            res.json({ msg: 'Error while deleting User' });
        } else {
            res.json({ msg: 'User deleted Successfully' });
        }

    })

});

router.post('/signup', (req, res, next) => {


    let newUser = new User({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        mobile: req.body.mobile,
        gender: req.body.gender,
        email: req.body.email,
        password: req.body.password,
        user_type: req.body.type
    });
    newUser.save((err, user) => {
        if (err) {
            console.log(err.errmsg);
            if (err.code == 11000) {
                if (err.errmsg.indexOf('email') >= 0) {
                    res.json({ msg: 'email already exist!' });
                } else if (err.errmsg.indexOf('mobile') >= 0) {
                    res.json({ msg: 'mobile no already exist!' });
                }
            } else {
                res.json({ msg: 'Failed to Create User' });
            }
        }
        else { res.json({ msg: 'User Create Successfully' }) }

    });

});

router.post('/login', (req, res, next) => {
    User.find({ 'email': req.body.email }, function (err, result) {
        if (err) {
            res.json({ msg: 'Error While Fetching User' })
        } else {
            if (result[0].password === req.body.password) {
                res.json({ result })
            } else {
                res.json({ msg: 'UserName And Password Missmatch' })
            }

        }

    });
});


module.exports = router;