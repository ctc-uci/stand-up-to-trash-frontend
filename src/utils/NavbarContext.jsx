import { createContext } from 'react';

const DataContext = createContext({
  isNavbarDrawerOpen: false,
  onNavbarDrawerOpen: () => {},
  onNavbarDrawerClose: () => {},
});

export default DataContext;
