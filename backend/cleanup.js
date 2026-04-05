import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const cleanDatabase = async () => {
  try {
    console.log('Cleaning database...');
    
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '11223344',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    await connection.query('DROP DATABASE IF EXISTS samadhan_db');
    console.log('Old database dropped');
    
    await connection.query('CREATE DATABASE samadhan_db');
    console.log('New database created');
    
    await connection.end();
    console.log('Database cleanup complete!');
    
  } catch (error) {
    console.error('Error cleaning database:', error);
    process.exit(1);
  }
};

cleanDatabase();
