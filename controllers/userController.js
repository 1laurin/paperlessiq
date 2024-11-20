const User = require('../models/User');
const Business = require('../models/Business');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

// Invite a user
exports.inviteUser = async (req, res) => {
    const { businessId, name, email, role } = req.body;

    try {
        // Ensure only admins can invite users
        const invitingUser = await User.findById(req.user.id); // Assuming req.user contains the logged-in user's info
        if (invitingUser.role !== 'admin') {
            return res.status(403).json({ message: 'Only admins can invite users.' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Create the invited user with the specified role
        const newUser = new User({
            name,
            email,
            role,
            businessId,
        });

        await newUser.save();

        const inviteLink = `${process.env.CLIENT_URL}/setup/${newUser._id}`; // Replace CLIENT_URL with your frontend URL

        res.status(201).json({ message: 'Invitation sent successfully', inviteLink });
    } catch (error) {
        console.error('Error inviting user:', error);
        res.status(500).json({ message: 'Failed to invite user.' });
    }
};

// Register user
exports.registerUser = async (req, res) => {
    const {
        businessName,
        contactPerson,
        email,
        phone,
        password,
        businessType,
        numOfEmployees,
        industry,
        documentsToDigitize,
        preferredContactMethod,
        termsAgreed,
    } = req.body;

    try {
        // Check if the business already exists
        const existingBusiness = await Business.findOne({ name: businessName });
        let businessId;

        if (!existingBusiness) {
            // Create a new business
            const newBusiness = new Business({
                name: businessName,
                contactEmail: email,
                businessType,
                numOfEmployees,
                industry,
                documentsToDigitize,
                plan: 'basic',
                storageLimit: 15,
                active: true,
            });

            const savedBusiness = await newBusiness.save();
            businessId = savedBusiness._id;
        } else {
            businessId = existingBusiness._id;

            // Check if the business already has an admin
            const adminExists = await User.findOne({ businessId, role: 'admin' });
            if (adminExists) {
                return res.status(403).json({
                    message: 'This business already has an admin. Please contact the existing admin for access.',
                });
            }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user with the admin role
        const newUser = new User({
            name: contactPerson,
            email,
            phone,
            password: hashedPassword,
            role: 'admin',
            businessId,
            preferredContactMethod,
            termsAgreed,
        });

        await newUser.save();
        res.status(201).json({ message: 'Admin registered successfully', businessId });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Registration failed. Please try again.' });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare the provided password with the stored password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role, businessId: user.businessId },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Successfully authenticated
        res.status(200).json({
            message: 'Login successful',
            token, // Include the token in the response
            user: { email: user.email, role: user.role, businessId: user.businessId },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update user details
exports.updateUserDetails = async (req, res) => {
    const { id } = req.params;
    const { title, profilePicture } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { title, profilePicture },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Failed to update user.' });
    }
};

// Delete user account
exports.deleteUserAccount = async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ email: req.params.email });
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Failed to delete user.' });
    }
};

// Fetch all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclude passwords from the response
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching all users:", error);
        res.status(500).json({ message: "Failed to fetch users." });
    }
};


// Fetch user details by email
exports.getUserDetails = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await User.findOne({ email }, '-password'); // Exclude password from the response
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Failed to fetch user details.' });
    }
};
