    import express from 'express';
    import corsMiddleware from './middleware/cors.middleware.js';
    import impactRoutes from './routes/impact.routes.js';
    import donorRoutes from './routes/donor.routes.js';
    import swaggerSpec from './docs/SwaggerSpec.js';
    import swaggerUi from 'swagger-ui-express';
    import notificationRoutes from './routes/notificationEngagement.routes.js';
    import collectionPointRoutes from '../src/routes/collectionPoints.routes.js';
    import FoodsRoutes from './routes/foods.routes.js';
    import beneficiaryRoutes from './routes/beneficiary.routes.js';

    const app = express();
    const PORT = 5000;

    app.use(corsMiddleware);
    app.use(express.json());
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use('/impact', impactRoutes);
    app.use('/donors', donorRoutes);
    app.use('/notification', notificationRoutes)
    app.use('/collection-points', collectionPointRoutes);
    app.use('/foods', FoodsRoutes);
    app.use('/beneficiary',beneficiaryRoutes);
    app.listen(PORT, ()=>{
        console.log(`Servidor rodando na porta ${PORT}`);
    });

    export default app;
