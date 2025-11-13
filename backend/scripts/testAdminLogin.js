const mongoose = require('mongoose');
const path = require('path');
const User = require('../models/User');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const testAdminLogin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find admin user
    const admin = await User.findOne({ email: 'admin@ecommerce.com' });
    
    if (!admin) {
      console.log('❌ Admin user not found!');
      process.exit(1);
    }

    console.log('✓ Admin user found:');
    console.log('  Email:', admin.email);
    console.log('  Name:', admin.name);
    console.log('  Role:', admin.role);
    console.log('  Password hash exists:', !!admin.password);
    console.log('  Password hash length:', admin.password.length);

    // Test password comparison
    const testPassword = 'admin123';
    console.log('\nTesting password:', testPassword);
    
    const isMatch = await admin.comparePassword(testPassword);
    console.log('Password match result:', isMatch);

    if (isMatch) {
      console.log('\n✓ Admin login credentials are correct!');
      console.log('\nYou can login with:');
      console.log('  Email: admin@ecommerce.com');
      console.log('  Password: admin123');
    } else {
      console.log('\n❌ Password does not match!');
      console.log('The admin user exists but the password is incorrect.');
      console.log('You may need to recreate the admin user.');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

testAdminLogin();
