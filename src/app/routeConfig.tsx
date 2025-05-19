import { PagesPage } from '@/pages/PagesPage';
import { PricePlansPage } from '@/pages/PricePlansPage';
import { ProductPage } from '@/pages/ProductPage';

const appRoutes = [
  { path: '/', element: <PagesPage />, index: true },
  { path: 'price-plans', element: <PricePlansPage /> },
  { path: 'products', element: <ProductPage /> },
];

export { appRoutes };
