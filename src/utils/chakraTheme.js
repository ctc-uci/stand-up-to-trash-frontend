import { checkboxAnatomy } from '@chakra-ui/anatomy';
import { extendTheme } from '@chakra-ui/react';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  checkboxAnatomy.keys,
);

const circularLg = definePartsStyle({
  control: defineStyle({
    rounded: 'full',
    background: 'white',
    width: '26px',
    height: '26px',
  }),
});

export const checkboxTheme = defineMultiStyleConfig({
  variants: { 'circular-lg': circularLg },
});

export const theme = extendTheme({
  components: { Checkbox: checkboxTheme },
});
