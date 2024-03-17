import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Input,
  Center,
  Grid,
  GridItem,
  Text,
  Icon,
} from '@chakra-ui/react';
import PersonIcon from '../../Assets/PersonIcon.svg';
import VolunteerTypeTag from './VolunteerTypeTag';
function CheckinModal() {
  return (
    <div>
      <Modal size="lg">
        <ModalOverlay backgroundColor={'rgba(0, 0, 0, .5)'} />
        <ModalContent borderRadius={'22px'} padding={5} width={'80%'}>
          <ModalCloseButton backgroundColor={'#EFEFEF'} borderRadius={'100px'} />
          <ModalHeader alignSelf={'center'} padding={50}>
            <Text fontWeight={'bold'} fontSize={'28px'}>
              Check-in volunteer
            </Text>
          </ModalHeader>
          <Grid templateRows="repeat(2, 1fr)">
            <GridItem colSpan={1}>
              <img src={PersonIcon} />
              <GridItem>
                <Grid templateColumns="repeat(2, 1fr)">
                  <Text fontWeight={'bold'} fontSize={'22px'}>
                    Johnny
                  </Text>
                  <VolunteerTypeTag
                    VolunteerType='Individual'
                  />
                </Grid>
              </GridItem>
            </GridItem>
          </Grid>
          <form>
            <FormControl>
              <ModalBody>
                <FormControl>
                  <Grid templateRows="repeat(2, 1fr)" gap={6}>
                    <GridItem colSpan={1}>
                      <Text fontWeight={'medium'} fontSize={'14px'} color={'#717171'}>
                        Party Size*
                      </Text>
                      <Grid templateRows="repeat(2, 1fr)" gap={1}>
                        <GridItem>
                          <Icon>
                            <GroupIcon style={{ color: '#717171' }} />
                          </Icon>
                        </GridItem>
                        <GridItem>
                          <Input marginTop={1} placeholder="12" alignItems={'center'} />
                        </GridItem>
                      </Grid>
                    </GridItem>
                  </Grid>
                </FormControl>
              </ModalBody>

              <Center p={8}>
                <Button
                  type="submit"
                  color="white"
                  bg="#003FE3"
                  w="70%"
                  h="50px"
                  style={{ borderRadius: '12px' }}
                  _hover={{ bg: '#002B99' }}
                >
                  Check in
                </Button>
              </Center>
            </FormControl>
          </form>
        </ModalContent>
      </Modal>

      {/* Modal for Agreement */}
    </div>
  );
}

export default CheckinModal;

const GroupIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 18" fill="none">
    <path
      d="M0 17.592L0 14.5848C0 13.9762 0.156805 13.417 0.470414 12.9072C0.784024 12.3974 1.20002 12.0079 1.71841 11.7387C2.82821 11.1838 3.95592 10.7678 5.10152 10.4907C6.24713 10.2136 7.41064 10.0747 8.59204 10.074C9.77345 10.074 10.937 10.2129 12.0826 10.4907C13.2282 10.7685 14.3559 11.1845 15.4657 11.7387C15.9848 12.0072 16.4011 12.3967 16.7147 12.9072C17.0284 13.4177 17.1848 13.9769 17.1841 14.5848L17.1841 17.592L0 17.592ZM19.3321 17.592L19.3321 14.37C19.3321 13.5824 19.113 12.826 18.6748 12.1007C18.2366 11.3753 17.6144 10.7535 16.8082 10.2351C17.7211 10.3425 18.5803 10.5262 19.3858 10.7861C20.1913 11.046 20.9431 11.3635 21.6412 11.7387C22.2856 12.0967 22.7779 12.4948 23.118 12.933C23.4581 13.3712 23.6281 13.8502 23.6281 14.37L23.6281 17.592H19.3321ZM8.59204 9C7.41064 9 6.39928 8.57935 5.55798 7.73804C4.71667 6.89674 4.29602 5.88539 4.29602 4.70398C4.29602 3.52257 4.71667 2.51122 5.55798 1.66992C6.39928 0.828611 7.41064 0.407959 8.59204 0.407959C9.77345 0.407959 10.7848 0.828611 11.6261 1.66992C12.4674 2.51122 12.8881 3.52257 12.8881 4.70398C12.8881 5.88539 12.4674 6.89674 11.6261 7.73804C10.7848 8.57935 9.77345 9 8.59204 9ZM19.3321 4.70398C19.3321 5.88539 18.9114 6.89674 18.0701 7.73804C17.2288 8.57935 16.2175 9 15.0361 9C14.8392 9 14.5886 8.9778 14.2843 8.93341C13.98 8.88902 13.7294 8.83961 13.5325 8.7852C14.0158 8.2124 14.3874 7.57694 14.6473 6.87884C14.9072 6.18074 15.0368 5.45578 15.0361 4.70398C15.0361 3.95218 14.9065 3.22722 14.6473 2.52912C14.3881 1.83102 14.0165 1.19556 13.5325 0.62276C13.7831 0.533259 14.0337 0.475263 14.2843 0.448771C14.5349 0.422279 14.7855 0.408675 15.0361 0.407959C16.2175 0.407959 17.2288 0.828611 18.0701 1.66992C18.9114 2.51122 19.3321 3.52257 19.3321 4.70398Z"
      fill="#717171"
    />
  </svg>
);
