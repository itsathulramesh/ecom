require('dotenv').config(); // loads .env for MONGODB_URI
const mongoose = require('mongoose');
const User = require('./models/User'); // adjust path if needed
const bcrypt = require('bcryptjs');

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const email = "admin@ecommerce.com";
    const password = "admin123";
    const name = "Admin User";

    // Check if admin already exists
    const existing = await User.findOne({ email });
    if (existing) {
      console.log("Admin user already exists ✅");
      return process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user manually
    const adminUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "admin", // 👈 this works because you're using the model directly
    });

    await adminUser.save();
    console.log("✅ Admin user created successfully!");
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
  } catch (error) {
    console.error("❌ Error creating admin:", error);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin();
