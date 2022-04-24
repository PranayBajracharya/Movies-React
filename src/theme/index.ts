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
    components: {
        Button: {
            variants: {
                primary: {
                    // backgroundColor: '#00FFCC',
                    borderRadius: "50%",
                    color: '#EEEEEE',
                    marginX: "5px",
                    padding: "5px",
                    _hover: {
                        backgroundColor: '#00FFCC',
                        color: '#222222',
                    },
                    _active: {
                        backgroundColor: '#00FFCC',
                    },
                    _focus: {
                        backgroundColor: '#00FFCC',
                    }
                },
                active: {
                    backgroundColor: '#00FFCC',
                    borderRadius: "50%",
                    color: '#222222',
                    marginX: "5px",
                    padding: "5px",
                    _hover: {
                        backgroundColor: '#00FFCC',
                    },
                    _active: {
                        backgroundColor: '#00FFCC',
                    },
                    _focus: {
                        backgroundColor: '#00FFCC',
                    }
                },
            }
        },
    //     UnorderedList: {
    //         variants: {
    //             search: {
    //                 backgroundColor: 'red',
    //             }
    //         }
    //     }
    }
});

export default theme;