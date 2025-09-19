import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';
import { z } from 'zod';

// Import schemas
import { 
  carRecommendationInputSchema, 
  createCarInputSchema, 
  updateCarInputSchema 
} from './schema';

// Import handlers
import { getCarRecommendations } from './handlers/get_car_recommendations';
import { createCar } from './handlers/create_car';
import { getAllCars } from './handlers/get_all_cars';
import { getCarById } from './handlers/get_car_by_id';
import { updateCar } from './handlers/update_car';
import { deleteCar } from './handlers/delete_car';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  // Health check endpoint
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // Main recommendation endpoint
  getCarRecommendations: publicProcedure
    .input(carRecommendationInputSchema)
    .query(({ input }) => getCarRecommendations(input)),

  // Car management endpoints
  createCar: publicProcedure
    .input(createCarInputSchema)
    .mutation(({ input }) => createCar(input)),

  getAllCars: publicProcedure
    .query(() => getAllCars()),

  getCarById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getCarById(input.id)),

  updateCar: publicProcedure
    .input(updateCarInputSchema)
    .mutation(({ input }) => updateCar(input)),

  deleteCar: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteCar(input.id)),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
  console.log('Available endpoints:');
  console.log('- healthcheck: GET /healthcheck');
  console.log('- getCarRecommendations: POST /getCarRecommendations');
  console.log('- createCar: POST /createCar');
  console.log('- getAllCars: GET /getAllCars');
  console.log('- getCarById: POST /getCarById');
  console.log('- updateCar: POST /updateCar');
  console.log('- deleteCar: POST /deleteCar');
}

start();