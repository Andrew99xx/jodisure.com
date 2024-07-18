import { createBrowserRouter } from 'react-router-dom';
// import About from './components/About';
// import Contact from './components/Contact';
// import NotFound from './components/NotFound';
import Privacy from './Privacy';
import Terms from './Terms';
import DisclaimerPage from './Disclaimer';
import Refund from './Refund';
import Service from './Service';
import DeleteProfile from './DeleteProfile';
import ShippingPolicy from './ShippingPolicy';
import Home from './Home';
import ContactUs from './ContactUs';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/contact',
    element: <ContactUs />,
  },
 
  {
    path: '/privacy',
    element: <Privacy />,
  },
  {
    path: '/terms-and-condition',
    element: <Terms />,
  },
  {
    path: '/disclaimer',
    element: <DisclaimerPage />,
  },
  {
    path: '/return',
    element: <Refund />,
  },
  {
    path: '/terms-of-service',
    element: <Service />,
  },
  {
    path: '/delete-profile',
    element: <DeleteProfile />,
  },
  {
    path: '/shipping-policy',
    element: <ShippingPolicy />,
  },
]);

export default router;
