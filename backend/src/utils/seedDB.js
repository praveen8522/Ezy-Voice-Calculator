import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';
import Plan from '../models/Plan.js';

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing data
    await Admin.deleteMany();
    await Plan.deleteMany();

    // Create default admin
    await Admin.create({
      username: 'admin',
      password: '12345',
      role: 'Administrator',
    });
    console.log('✅ Admin created: username=admin, password=12345');

    // Create default plans
    const plans = [
      {
        name: 'Go',
        price: '₹149',
        duration: '30 Days',
        features: ['Basic Voice Inputs', 'Standard AI Processing', '1 Device'],
        status: 'Active',
        icon: 'Star',
      },
      {
        name: 'Pro',
        price: '₹499',
        duration: '180 Days',
        features: ['10,000 Voice Inputs', 'Fast AI Processing', 'Multi-Device Support', 'Priority Access'],
        status: 'Active',
        icon: 'Rocket',
      },
      {
        name: 'Plus',
        price: '₹899',
        duration: '365 Days',
        features: ['Unlimited Voice Inputs', 'Advanced AI Engine', 'Ultra-fast Response', 'Email Support'],
        status: 'Active',
        icon: 'Crown',
      },
      {
        name: 'Elite',
        price: '₹1999',
        duration: 'Lifetime',
        features: ['Lifetime Unlimited Access', 'Premium AI Engine', '24/7 Support', 'Custom Voice Training', 'Exclusive Features'],
        status: 'Active',
        icon: 'Infinity',
      },
    ];

    await Plan.insertMany(plans);
    console.log('✅ Plans created');

    console.log('✅ Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Seed Error:', error);
    process.exit(1);
  }
};

seedDB();