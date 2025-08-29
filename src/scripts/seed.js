// Initialize test users
import { MongoClient, ObjectId } from 'mongodb';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// MongoDB connection URI
const uri = process.env.MONGODB_URI || 'mongodb://admin:password@localhost:27017/calendar_db?authSource=admin';

async function seedDatabase() {
    console.log('Starting to seed the database with test users...');
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db();
        const usersCollection = db.collection('users');

        // Check if users already exist
        const existingUsersCount = await usersCollection.countDocuments();
        if (existingUsersCount > 0) {
            console.log(`Database already has ${existingUsersCount} users. Skipping seeding.`);
            return;
        }

        // Create test users
        const testUsers = [
            {
                _id: new ObjectId(),
                name: 'John Doe',
                email: 'john.doe@example.com',
                calendarEvents: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                _id: new ObjectId(),
                name: 'Jane Smith',
                email: 'jane.smith@example.com',
                calendarEvents: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        const result = await usersCollection.insertMany(testUsers);
        console.log(`${result.insertedCount} users inserted successfully`);
        console.log('User IDs for testing:');
        testUsers.forEach(user => {
            console.log(`${user.name}: ${user._id.toString()}`);
        });
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await client.close();
        console.log('Closed MongoDB connection');
    }
}

seedDatabase().catch(console.error);
