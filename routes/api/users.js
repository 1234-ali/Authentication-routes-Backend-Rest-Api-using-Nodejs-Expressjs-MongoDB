const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const User = require('../../models/User');
const auth = require('../../middleware/auth');

router.put(
    '/username', 
    auth,
    async (req, res) => {

      const { username } = req.body;
      
      try {
        
        const user = await User.updateOne(
          { _id: req.user.id },
          { $set: { username } }
        );
  
        res.json(user);
      } catch (err) {
        res.status(404).send('Server error');
      }  
});

router.post(
  '/',
    async (req, res) => {

      const { email, password } = req.body;

      try {

      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors:  [{ msg: 'User already exists' }] });
      }

      user = new User({
        username: '',
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.json({ msg: 'Account created successfully.' });

    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;