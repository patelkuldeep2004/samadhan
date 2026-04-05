import sequelize from '../db/config.js';
import seedProducts from './productSeeder.js';

const runSeeders = async () => {
  try {
    await sequelize.sync({ force: false });
    
    await seedProducts();
    
    process.exit(0);
    
  } catch (error) {
    process.exit(1);
  }
};

runSeeders();
