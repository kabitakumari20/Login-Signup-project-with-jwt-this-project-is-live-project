const {accessToken, generatToken} = require("../auth/auth")
const express = require("express");
const knex = require("../databases/db")
const router = express.Router()
const Jwt = require('jsonwebtoken');


// for signup--------------
router.post('/signup', (req, res) => {
    knex.select("*")
        .from('user').where({ 'email': req.body.email }).then((data) => {
    
            if (data.length < 1) {
                knex('user').insert(req.body).then((data) => {
                    // console.log(data)
                    res.send({ data: 'inserted' })
                    console.log("data insert successfully")
                }).catch((err) => {
                    res.send(err)
                    console.log(err)
                })
            }
            else {
                res.send("your account is already created:")
            }
        })
})
router.get('/login', (req, res) => {
    // console.log(req.data);
    knex.select('*').from('user').where('email', req.body.email).then((data) => {
        if (data < 1) {
            console.log(data)
            res.send({
                data: "You cant login this page\nBecause you did not signup yet.."
            });
        } else if (data[0].password !== req.body.password) {
            res.send("You write the wrong password...")
            console.log("You write the wrong password...")

        } else{
            const token = generatToken(req.body.email)
            res.cookie("token",token)
            res.send("You have login this page successfully...")
            console.log("You have login this page successfully...")
        }
    })
})
router.put('/update',accessToken,(req,res)=>{
    let demo={name:req.body.name, email:req.body.email, password: req.body.password}
    knex('user').update (demo)
        .where({id:req.body.id}).then((data)=>{
        res.send ({data: 'data update successfully'})
        console.log("update successfully")
    }).catch((err)=>{
        res.send(err)
        console.log(err)
    })
})

router.delete('/delete', accessToken,(req,res)=>{
    let demo={id:req.body.id}
    knex('user').delete (demo)
        .where({id:req.body.id}).then((data)=>{
        res.send ({data: 'data delete successfully'})
        console.log("delete successfully")
    }).catch((err)=>{
        res.send(err)
        console.log(err)
    })
})

// router.get('/gettAl', (req, res) => {
//     knex.select('*').from('user').then((result) => {
//         res.send(result)
//     }).catch((err) => {
//         res.send(err)
//     })
// })

module.exports = router
