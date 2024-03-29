import { createIcon } from '@chakra-ui/react';

const CustomSearchIcon = createIcon({
  displayName: 'CustomSearchIcon',
  viewBox: '0 0 21 21',
  width: '21',
  height: '21',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',

  path: (
    <path
      d="M16.531 15.117L20.814 19.399L19.399 20.814L15.117 16.531C13.5237 17.8082 11.542 18.5029 9.5 18.5C4.532 18.5 0.5 14.468 0.5 9.5C0.5 4.532 4.532 0.5 9.5 0.5C14.468 0.5 18.5 4.532 18.5 9.5C18.5029 11.542 17.8082 13.5237 16.531 15.117ZM14.525 14.375C15.7941 13.0699 16.5029 11.3204 16.5 9.5C16.5 5.632 13.367 2.5 9.5 2.5C5.632 2.5 2.5 5.632 2.5 9.5C2.5 13.367 5.632 16.5 9.5 16.5C11.3204 16.5029 13.0699 15.7941 14.375 14.525L14.525 14.375Z"
      fill="white"
    />
  ),
});

const GreyCustomSearchIcon = createIcon({
  displayName: 'CustomSearchIcon',
  viewBox: '0 0 21 21',
  width: '21',
  height: '21',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',

  path: (
    <path
      d="M16.531 15.117L20.814 19.399L19.399 20.814L15.117 16.531C13.5237 17.8082 11.542 18.5029 9.5 18.5C4.532 18.5 0.5 14.468 0.5 9.5C0.5 4.532 4.532 0.5 9.5 0.5C14.468 0.5 18.5 4.532 18.5 9.5C18.5029 11.542 17.8082 13.5237 16.531 15.117ZM14.525 14.375C15.7941 13.0699 16.5029 11.3204 16.5 9.5C16.5 5.632 13.367 2.5 9.5 2.5C5.632 2.5 2.5 5.632 2.5 9.5C2.5 13.367 5.632 16.5 9.5 16.5C11.3204 16.5029 13.0699 15.7941 14.375 14.525L14.525 14.375Z"
      fill="#A0AEC0"
    />
  ),
});

export { CustomSearchIcon, GreyCustomSearchIcon };
