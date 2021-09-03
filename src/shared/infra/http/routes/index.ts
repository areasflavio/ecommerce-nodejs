import { Router } from 'express';

import customersRouter from '@modules/customers/infra/http/routes/customers.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';

const routes = Router();

routes.use('/customers', customersRouter);
routes.use('/products', productsRouter);

export default routes;
