import {
    createIcon, 
    extendTheme
} from '@chakra-ui/react'

const CancelIcon = createIcon(
    {
        displayName: "CancelIcon",
        viewBox: "0 0 24 25",
        width: '24',
        height: '25',

        path:  (
            <path
                fill='black'
                d='M4 17.2133L8.23111 13L4 8.78667L7.78667 5L12 9.23111L16.2133 5L20 8.78667L15.7689 13L20 17.2133L16.2133 21L12 16.7689L7.78667 21L4 17.2133ZM12 14.2533L16.2133 18.4756L17.4756 17.2133L13.2533 13L17.4756 8.78667L16.2133 7.52444L12 11.7467L7.78667 7.52444L6.52444 8.78667L10.7467 13L6.52444 17.2133L7.78667 18.4756L12 14.2533Z'
            />
        )
      }
);

const CreateEventIcon = createIcon(
    {
        displayName: "CreateEventIcon",
        viewBox: "0 0 24 25",

        path:  (
            <path
                fill='black'
                d='M21 14.5V19.5C21 20.0304 20.7893 20.5391 20.4142 20.9142C20.0391 21.2893 19.5304 21.5 19 21.5H5C4.46957 21.5 3.96086 21.2893 3.58579 20.9142C3.21071 20.5391 3 20.0304 3 19.5V5.5C3 4.96957 3.21071 4.46086 3.58579 4.08579C3.96086 3.71071 4.46957 3.5 5 3.5H10V5.5H5V19.5H19V14.5H21Z M21 7.5H17V3.5H15V7.5H11V9.5H15V13.5H17V9.5H21V7.5Z'
            />
        )
      }
);

const FileUploadIcon = createIcon(
    {
        displayName: "FileUploadIcon",
        viewBox: "0 0 37 37",

        path:  (
            <path
                fill='black'
                d='M16.9583 24.6667V12.1022L12.95 16.1105L10.7916 13.8751L18.5 6.16675L26.2083 13.8751L24.05 16.1105L20.0416 12.1022V24.6667H16.9583ZM9.24996 30.8334C8.40204 30.8334 7.67643 30.5318 7.07313 29.9285C6.46982 29.3251 6.16765 28.599 6.16663 27.7501V23.1251H9.24996V27.7501H27.75V23.1251H30.8333V27.7501C30.8333 28.598 30.5316 29.3241 29.9283 29.9285C29.325 30.5328 28.5989 30.8344 27.75 30.8334H9.24996Z'
            />
        )
      }
);

const theme = extendTheme({
    icons: {
      FileUploadIcon,
      CreateEventIcon,
      CancelIcon
    },
  });

export {
    theme,
    FileUploadIcon,
    CreateEventIcon,
    CancelIcon
}
