import Navbar from './Navbar'; // Make sure the path to your Navbar component is correct.

import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react';

import PropTypes from 'prop-types';

const NavbarDrawer = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent p={0}>
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Navbar onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

NavbarDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NavbarDrawer;
