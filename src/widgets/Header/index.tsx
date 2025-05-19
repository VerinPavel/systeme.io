import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-purple-600 text-white px-6 py-4 shadow-md">
      <nav className="flex gap-6 text-sm font-medium">
        <Link to="/" className="hover:underline">
          Pages
        </Link>
        <Link to="/price-plans" className="hover:underline">
          Price Plans
        </Link>
        <Link to="/products" className="hover:underline">
          Products
        </Link>
      </nav>
    </header>
  );
};

export { Header };
