import { Checkbox, Box, Text } from '@chakra-ui/react';
import RegistrationModal from './RegistrationModal';
import PropTypes from 'prop-types';
import { useState } from 'react';

const WAIVER_TEXT = `Stand Up To Trash BEACH CLEANUP WAIVER OF LIABILITY AND EXPRESS ASSUMPTION OF RISK (PLEASE READ CAREFULLY) I agree as follows: 1. I am volunteering my services for the Stand Up To Trash Beach Cleanup; 2. I will perform assigned tasks that are within my physical capability, and I will not undertake tasks that are beyond my ability; 3. I will not participate if under the influence of alcohol or any drug that could impair my physical or mental abilities; 4. I have received appropriate instruction regarding this Event, including appropriate safety and emergency procedures, I fully understand those instructions, and I agree, after proper inspection, to use only the supplies, tools and equipment provided by Event organizers; 5. I will perform only those tasks assigned, observe all safety rules, and use care in the performance of my assignments; 6. Stand Up To Trash will not be held liable or responsible in any way for any injury, death or other damages to me or my family, heirs, or assigns that may occur as a result of my participation in the Event, or as a result of product liability or the negligence, whether passive or active, of any party, including Released Parties, in connection with the Event. I understand that cleaning up beaches or inland water areas involves certain inherent risks, including but not limited to, the risks of possible injury, infection or loss of life as a result of contact with needles, condoms, metal objects, burning embers or other hazardous materials, wild animals, poisonous plants, snakes, or from over-exertion or environmental conditions, including but not limited to flooding, rockslides, sun exposure, or dangerous terrain. No known physical or health limitation prevents me from safely participating in this Event. In Consideration for being allowed to participate, I personally assume all risks, whether foreseen or unforeseen, in connection with the Event of any harm, injury or damage that may befall me as a participant. If I am injured during the Event, I authorize any physician licensed in California to perform such emergency treatment as he or she believes, in his or her sole judgment, may be necessary. I am over the age of eighteen and legally competent to sign this liability release, or I have acquired the written consent of my parent or guardian. I understand that the terms herein are contractual and not a mere recital, this instrument is legally binding, and I have signed this document of my own free act. I agree to allow my image to be used in published materials and web sites that promote the programs of Stand Up To Trash. By including my email address below, I understand that Stand Up To Trash may contact me about future Stand Up To Trash events and other Public Education programs. I HEREBY RELEASE AND HOLD HARMLESS Stand Up To Trash FROM ANY CLAIM OR LAWSUIT FOR PERSONAL INJURY, PROPERTY DAMAGE, OR WRONGFUL DEATH, BY ME, MY FAMILY, ESTATE, HEIRS, OR ASSIGNS, ARISING OUT OF PARTICIPATION IN THE EVENT, INCLUDING BOTH CLAIMS ARISING DURING THE ACTIVITY AND AFTER I COMPLETE THE ACTIVITY, AND INCLUDING CLAIMS BASED ON NEGLIGENCE OF OTHER PARTICIPANTS OR THE RELEASED PARTIES, WHETHER PASSIVE OR ACTIVE. I HAVE FULLY INFORMED MYSELF OF THE CONTENTS OF THIS LIABILITY RELEASE AND ASSUMPTION OF RISK. Signature of Participant City, State, Zip E-mail IF PARTICIPANT IS UNDER 18, THE PARENT (OR GUARDIAN, IF ANY) MUST SIGN. I am the parent or legal guardian of the above participant and he/she has my permission to participate in the Stand Up To Trash Beach Cleanup. I have read and agree to the provisions stated above for myself and the participant. Further, I understand and agree that the sponsors and organizers of the Event are not responsible for supervision of minor participants and that if I allow the above minor to participate without my supervision, I assume all the risks from such participation.`;

const SignWaiverModal = ({ registrationFlowState, ...props }) => {
  const [agreed, setAgreed] = useState(false);

  // Copy to prevent mutating original instance
  registrationFlowState = { ...registrationFlowState };
  registrationFlowState.continueActive = registrationFlowState.continueActive && agreed;

  return (
    <RegistrationModal
      title="Sign your Waiver"
      registrationFlowState={registrationFlowState}
      continueText={'Register'}
      {...props}
    >
      <Box>
        <Text color={'#717171'} fontSize={'16px'} fontWeight={'400'} pb="1">
          Read terms and conditions
        </Text>
        {/* Terms box */}
        <Box maxH="250px" overflowY={'scroll'} borderRadius={'12px'} border="3px solid #EFEFEF">
          <Text
            color={'#3B3B3B'}
            fontSize={'18px'}
            fontWeight={'300'}
            py="3"
            px="2"
          >
            {WAIVER_TEXT}
          </Text>
        </Box>
      </Box>
      <Checkbox
        onChange={e => setAgreed(e.target.checked)}
        size={'lg'}
        pt="4"
        style={{ '--chakra-colors-blue-500': '#0075FF', '--chakra-radii-sm': '5px' }}
      >
        <Text color={'#717171'} fontSize={'16px'} fontWeight={'400'}>
          I agree to the terms and conditions
        </Text>
      </Checkbox>
    </RegistrationModal>
  );
};

SignWaiverModal.propTypes = {
  registrationFlowState: PropTypes.object,
};

export default SignWaiverModal;
