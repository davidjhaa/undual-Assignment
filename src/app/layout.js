'use client';

import { Provider } from 'react-redux';
import store from '../store/store'; 

const Layout = ({ children }) => {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          {children} 
        </body>
      </html>
    </Provider>
  );
};

export default Layout;
