import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Sidebar = ({ children }) => {
  return (
    <>
      <Box
        position="sticky"
        top="0"
        width="75px"
        float="left"
        style={{ shapeOutside: 'inset(50%' }}
      >
        <Box
          h="100vh"
          backgroundColor="#9DDAEF"
          flex="0 0 75px"
          display="flex"
          flexDir="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" flexDir="column" p="10px" pt="24px" gap="20px">
            {/* Top sidebar items */}
            <Box
              display="flex"
              as="a"
              href="/"
              background="#2D558A"
              borderRadius="12px"
              padding="8px"
              width="46px"
              height="46px"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25);"
            >
              <svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.825 17.5C6.41282 17.5 7.7 16.2128 7.7 14.625V13.4471C7.7 12.1768 8.72974 11.1471 10 11.1471C11.2703 11.1471 12.3 12.1768 12.3 13.4471V14.625C12.3 16.2128 13.5872 17.5 15.175 17.5C16.7628 17.5 18.05 16.2128 18.05 14.625V9.94355C18.05 9.43868 18.4593 9.02941 18.9641 9.02941C19.8204 9.02941 20.2067 7.95773 19.5474 7.4114L12.0361 1.18721C10.8551 0.208571 9.1449 0.208571 7.96389 1.18721L0.452601 7.4114C-0.206705 7.95773 0.179617 9.02941 1.03587 9.02941C1.54073 9.02941 1.95 9.43868 1.95 9.94355V14.625C1.95 16.2128 3.23718 17.5 4.825 17.5Z"
                  fill="white"
                />
              </svg>
            </Box>
            <Box
              display="flex"
              as="a"
              href="#"
              onClick={() => alert("I don't do anything yet")}
              background="#6395BB"
              borderRadius="12px"
              padding="8px"
              width="46px"
              height="46px"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25);"
            >
              <svg width="21" height="23" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.1668 20.6665H3.8335V18.8332C3.8335 17.6176 4.27248 16.4518 5.05388 15.5923C5.83529 14.7327 6.89509 14.2498 8.00016 14.2498H13.0002C14.1052 14.2498 15.165 14.7327 15.9464 15.5923C16.7278 16.4518 17.1668 17.6176 17.1668 18.8332V20.6665ZM10.5002 12.4165C9.84355 12.4165 9.19337 12.2742 8.58675 11.9978C7.98012 11.7214 7.42892 11.3163 6.96463 10.8056C6.50034 10.2949 6.13204 9.68855 5.88076 9.02126C5.62949 8.35397 5.50016 7.63877 5.50016 6.9165C5.50016 6.19423 5.62949 5.47904 5.88076 4.81175C6.13204 4.14445 6.50034 3.53814 6.96463 3.02742C7.42892 2.51669 7.98012 2.11157 8.58675 1.83517C9.19337 1.55877 9.84355 1.4165 10.5002 1.4165C11.8262 1.4165 13.098 1.99597 14.0357 3.02742C14.9734 4.05887 15.5002 5.45781 15.5002 6.9165C15.5002 8.37519 14.9734 9.77414 14.0357 10.8056C13.098 11.837 11.8262 12.4165 10.5002 12.4165Z" fill="white"/>
              </svg>
            </Box>
            <Box
              display="flex"
              as="a"
              href="#"
              onClick={() => alert("I don't do anything yet")}
              background="#6395BB"
              borderRadius="12px"
              padding="8px"
              width="46px"
              height="46px"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25);"
            >
              <svg
                width="22"
                height="17"
                viewBox="0 0 22 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.5 4.16667C21.5 3.54783 21.2419 2.95434 20.7824 2.51675C20.3229 2.07917 19.6998 1.83334 19.05 1.83334H9.42981C9.22265 1.83397 9.01997 1.77596 8.8475 1.66667L7.63125 0.892088C7.2285 0.635594 6.75469 0.499101 6.27019 0.500004H2.95C2.30022 0.500004 1.67705 0.745837 1.21759 1.18342C0.758124 1.62101 0.5 2.2145 0.5 2.83334V4.83334C0.5 4.92174 0.536875 5.00653 0.602513 5.06904C0.66815 5.13155 0.757174 5.16667 0.85 5.16667H21.15C21.2428 5.16667 21.3319 5.13155 21.3975 5.06904C21.4631 5.00653 21.5 4.92174 21.5 4.83334V4.16667ZM0.5 14.1667C0.5 14.7855 0.758124 15.379 1.21759 15.8166C1.67705 16.2542 2.30022 16.5 2.95 16.5H19.05C19.6998 16.5 20.3229 16.2542 20.7824 15.8166C21.2419 15.379 21.5 14.7855 21.5 14.1667V6.83334C21.5 6.74493 21.4631 6.66015 21.3975 6.59763C21.3319 6.53512 21.2428 6.5 21.15 6.5H0.85C0.757174 6.5 0.66815 6.53512 0.602513 6.59763C0.536875 6.66015 0.5 6.74493 0.5 6.83334V14.1667Z"
                  fill="white"
                />
              </svg>
            </Box>
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
            {/* <svg
              width="55"
              height="55"
              viewBox="0 0 55 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="27.5" cy="27.5" r="27.5" fill="#404040" />
            </svg> */}
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
