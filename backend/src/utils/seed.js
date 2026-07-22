const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');
const Content = require('../models/Content');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    const existingAdmin = await User.findOne({ username: 'admin' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({ username: 'admin', password: hashedPassword, role: 'admin' });
      console.log('Admin user created (username: admin, password: admin123)');
    } else {
      console.log('Admin user already exists.');
    }

    const existingHero = await Content.findOne({ section: 'hero' });
    if (!existingHero) {
      await Content.create({
        section: 'hero',
        title: 'Hero Section',
        slug: 'hero',
        status: 'published',
        blocks: [
          { type: 'heading', data: { text: 'Welcome to Our Platform', level: 1 } },
          { type: 'paragraph', data: { text: 'We build modern, scalable solutions for businesses that want to grow faster and smarter.' } }
        ]
      });
      console.log('Hero content seeded.');
    }

    const existingAbout = await Content.findOne({ section: 'about' });
    if (!existingAbout) {
      await Content.create({
        section: 'about',
        title: 'About Us',
        slug: 'about',
        status: 'published',
        blocks: [
          { type: 'heading', data: { text: 'About Our Company', level: 2 } },
          { type: 'paragraph', data: { text: 'Founded with a vision to simplify technology, our team has years of experience delivering products that matter.' } },
          { type: 'list', data: { style: 'unordered', items: ['Innovative solutions', 'Customer-first approach', 'Scalable architecture'] } }
        ]
      });
      console.log('About content seeded.');
    }

    const existingServices = await Content.findOne({ section: 'services' });
    if (!existingServices) {
      await Content.create({
        section: 'services',
        title: 'Our Services',
        slug: 'services',
        status: 'published',
        blocks: [
          { type: 'heading', data: { text: 'What We Offer', level: 2 } },
          {
            type: 'table',
            data: {
              headers: ['Service', 'Description', 'Price'],
              rows: [
                ['Web Development', 'Custom web applications', '$999+'],
                ['Mobile Apps', 'iOS & Android development', '$1499+'],
                ['Consulting', 'Technical strategy & planning', '$199/hr']
              ]
            }
          }
        ]
      });
      console.log('Services content seeded.');
    }

    console.log('Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seedData();