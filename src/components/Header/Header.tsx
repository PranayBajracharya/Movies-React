import { NavLink } from "react-router-dom";
import {
    Heading,
    HStack,
    UnorderedList,
    ListItem,
    Input,
} from "@chakra-ui/react";

const Header: React.FC = () => {
    return (
        <HStack
            justifyContent="space-between"
            marginY={3}
            paddingX={10}
            w="100%"
            maxW="1600px"
        >
            <Heading color="primary.default">Movies React</Heading>

            <UnorderedList display="flex" styleType="none">
                <ListItem mx={5}>
                    <NavLink
                        className={(navData) =>
                            navData.isActive ? "active" : ""
                        }
                        to="/"
                    >
                        Home
                    </NavLink>
                </ListItem>
                <ListItem mx={5}>
                    <NavLink
                        className={(navData) =>
                            navData.isActive ? "active" : ""
                        }
                        to="/movies"
                    >
                        Movies
                    </NavLink>
                </ListItem>
                <ListItem mx={5}>
                    <NavLink
                        className={(navData) =>
                            navData.isActive ? "active" : ""
                        }
                        to="/tv-series"
                    >
                        TV-Series
                    </NavLink>
                </ListItem>
            </UnorderedList>

            <Input w="250px" />
        </HStack>
    );
};

export default Header;
