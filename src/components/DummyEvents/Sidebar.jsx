import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Sidebar = ({ children }) => {
  return (
    <>
      <Box position="sticky" top="0" width="74x" float="left" style={{ shapeOutside: 'inset(50%' }}>
        <Box
          h="100vh"
          backgroundColor="#D9D9D9"
          flex="0 0 73px"
          display="flex"
          flexDir="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" flexDir="column" p="10px" as="a" href="/">
            {/* Top sidebar items */}
            <svg
              width="55"
              height="55"
              viewBox="0 0 55 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.9166 45.8333V32.0833H32.0833V45.8333H43.5416V27.5H50.4166L27.5 6.875L4.58331 27.5H11.4583V45.8333H22.9166Z"
                fill="black"
              />
            </svg>
          </Box>
          <Box
            display="flex"
            flexDir="column"
            p="10px"
            as="a"
            href="#"
            onClick={() => {
              alert("I don't do anything yet");
            }}
          >
            {/* Bottom sidebar items */}
            <svg
              width="55"
              height="55"
              viewBox="0 0 55 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="27.5" cy="27.5" r="27.5" fill="#404040" />
            </svg>
          </Box>
        </Box>
      </Box>
      <Box ml="74px">{children}</Box>
    </>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Sidebar;
