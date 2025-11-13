const mongoose = require('mongoose');
const path = require('path');
const User = require('../models/User');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const resetAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Delete existing admin
    const deleted = await User.deleteOne({ email: 'admin@ecommerce.com' });
    if (deleted.deletedCount > 0) {
      console.log('✓ Deleted existing admin user');
    }

    // Create new admin user
    const admin = new User({
      name: 'Admin',
      email: 'admin@ecommerce.com',
      password: 'admin123',
      role: 'admin'
    });

    await admin.save();
    
    console.log('\n✓ Admin user created successfully!');
    console.log('\nCredentials:');
    console.log('  Email: admin@ecommerce.com');
    console.log('  Password: admin123');
    
    // Verify the password works
    const testAdmin = await User.findOne({ email: 'admin@ecommerce.com' });
    const isMatch = await testAdmin.comparePassword('admin123');
    
    if (isMatch) {
      console.log('\n✓ Password verification successful!');
      console.log('You can now login at: http://localhost:3000/admin/login');
    } else {
      console.log('\n❌ Password verification failed!');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

resetAdmin();
