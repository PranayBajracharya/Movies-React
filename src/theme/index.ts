import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        primary: {
            default: '#00FFCC',
        },
        secondary: {
            default: '#222222'
        },
        alternate: {
            default: '#EEEEEE'
        }
    },
    // components: {
    //     Button: {
    //         variants: {
    //             solid: {
    //                 backgroundColor: '#282c34',
    //                 _hover: {
    //                     backgroundColor: '#121417',
    //                 },
    //                 _active: {
    //                     backgroundColor: '#121417',
    //                 },
    //                 _focus: {
    //                     backgroundColor: '#121417',
    //                 }
    //             },
    //             active: {
    //                 backgroundColor: '#121417',
    //                 _hover: {
    //                     backgroundColor: '#121417',
    //                 },
    //                 _active: {
    //                     backgroundColor: '#121417',
    //                 },
    //                 _focus: {
    //                     backgroundColor: '#121417',
    //                 }
    //             },
    //         }
    //     },
    //     UnorderedList: {
    //         variants: {
    //             search: {
    //                 backgroundColor: 'red',
    //             }
    //         }
    //     }
    // }
});

export default theme;