import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/widgets/Layout';
import { appRoutes } from './routeConfig';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {appRoutes.map(({ path, element, index }) => (
            <Route
              key={path}
              path={index ? undefined : path}
              index={index}
              element={element}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { Router };
