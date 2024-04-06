const express = require('express');
const router = express.Router();
const authenticate = require("../middleware/authenticate")


const User = require('../models/userSchema');

router.get('/', (req, res) => {
    res.send('Hello World');
}
);

router.post('/register', (req, res) => {
    const { name, email, password, cpassword } = req.body;
    if (!name || !email || !password || !cpassword) {
        return res.status(422).json({ error: 'Please fill all fields' });
    }
    res.json({ message: req.body });

    User.findOne({ email:email })
        .then((userExist) => {
            if (userExist) {
                return res.status(422).json({ error: 'Email already exists' });
            }
            const user = new User({ name, email, password, cpassword });
            user.save().then(() => {
                res.status(201).json({ message: 'User registered successfully' });
            }).catch((err) => res.status(500).json({ error: 'Failed to register' }));
        }).catch(err => { console.log(err); });


    
});


router.post('/signin', async (req, res) => {
    try{
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Please fill all fields' });
        }
        const userLogin = await User.findOne({ email: email });
        const generateAuthToken = await userLogin.generateAuthToken();
        console.log(generateAuthToken);
        res.cookie('jwtoken', generateAuthToken, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        });

        if (userLogin) {
            if (email === userLogin.email && password === userLogin.password) {
                res.json({ message: 'User signed in successfully' });
            }
            
            else {
                return res.status(400).json({ error: 'Invalid credentials' });
            }
        } else {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        console.log(err);
    }   
}
);

router.get('/logout', (req, res) => {
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send('User logged out');
});



module.exports = router;