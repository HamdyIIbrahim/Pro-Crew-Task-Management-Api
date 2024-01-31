import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      try {
        await mongoose.connect(
          `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ac-trjxssp-shard-00-00.b5tsgro.mongodb.net:27017,ac-trjxssp-shard-00-01.b5tsgro.mongodb.net:27017,ac-trjxssp-shard-00-02.b5tsgro.mongodb.net:27017/${process.env.DB_DBNAME}?ssl=true&replicaSet=atlas-jjiu6e-shard-0&authSource=admin&retryWrites=true&w=majority`,
        );
        console.log('Connected');
        return mongoose;
      } catch (error) {
        console.error('Connection to MongoDB failed');
        throw error;
      }
    },
  },
];
