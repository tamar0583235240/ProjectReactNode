const User = require("../models/User")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Role = require('../models/Role');


exports.SignUp = async (req, res) => {
    try {
        const { user_name, password, email, role, manager_id, organization_id } = req.body
        if (!user_name || !password || !email || !role|| !organization_id) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        console.log(req.body)

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'This email already exists in the system' });
        }
        // const roleFromDB = await Role.findOne({ user_name: 'Manager' });
        // if (!roleFromDB) {
        //     return res.status(500).json({ message: 'Role not found in system' });
        // }
        const hashedPwd = await bcrypt.hash(password, 10)
        const userObject = { user_name, password: hashedPwd, email, role, manager_id, organization_id }
        const user = await User.create(userObject)
        // if (user) {
        //     return res.status(201).json({
        //         user,
        //         message: `New user ${user.user_name} created`
        //     });
        // }
        if(!user){
            return res.status(400).json({ message: 'User creation failed' })
        }
     
        // if (role === roleFromDB._id.toString()) {
            const accessToken = jwt.sign(
                {
                    userId: user._id,
                    role: user.role,
                    organization_id: user.organization_id,
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            // res.json({ accessToken: accessToken })
            
          return res.status(201).json({
            user,
            accessToken,
            message: `New user ${user.user_name} created`
        });

        // } else {
            // return res.status(400).json({ message: 'Invalid user received' })
        // }
    }

     catch (error) {
    console.error('Failed to add user:', error);
    res.status(500).json({ message: 'Failed to add user', error: error.message });
}
};
exports.SignIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const accessToken = jwt.sign(
            {
                userId: user._id,
                role: user.role,
                organization_id: user.organization_id,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }

        );
        res.json({ accessToken: accessToken })

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Login failed', error: err.message });
    }

}


