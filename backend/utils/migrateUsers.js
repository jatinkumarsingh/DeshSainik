const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const migrateUsers = async () => {
  try {
    const usersFilePath = path.join(__dirname, '../users.json');
    const data = fs.readFileSync(usersFilePath, 'utf8');
    const users = JSON.parse(data);

    for (const user of users) {
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        const newUser = new User({
          email: user.email,
          password: user.password, // Already hashed
          name: '', // No name in old data
          createdAt: new Date(user.createdAt)
        });
        await newUser.save();
        console.log(`Migrated user: ${user.email}`);
      }
    }

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration error:', error);
  }
};

module.exports = migrateUsers;
