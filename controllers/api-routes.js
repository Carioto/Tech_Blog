const router = require('express').Router();
const { User } = require('../models');

//new user
router.post('/users', async (req,res) => {
   try{
     const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
     }).then(userData => {
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.user_id = userData.id;
        res.status(200).json(userData);
      })
      });
   } catch (err) {
    console.log(err);
    res.status(500).json(err);
   }
});

//log in user
router.post('/users/login', async (req,res) => {
    try {
       const userData = await User.findOne({
        where: {
            email:req.body.email,
        },
       });
      
       if(!userData) {
        res.status(400).json({message:"email or password incorrect.  Try again."});
        return;
       }

      const rightPass = await userData.checkPassword(req.body.password);

      if (!rightPass) {
        console.log(`email or password wrong ${userData}`)
        res.status(400).json({message:"email or password incorrect. Try again."});
        return;
      }else{      
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.user_id = userData.id;
        res.status(200).json(userData);
      });
      console.log('logged in')
    }} catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// log out user
router.post('/users/logout', (req,res) => {
       if(req.session.loggedIn){
        req.session.destroy(() =>{
            res.status(200).end();
        })
       }
})
module.exports = router;