import { NavLink } from "react-router-dom";
import { Heading, HStack, UnorderedList, ListItem } from "@chakra-ui/react";

import Search from "../Search/Search";

const Header: React.FC<{
    showModel: (id: number, media_type: string) => void;
}> = (props) => {
    return (
        <HStack
            justifyContent="space-between"
            marginY={3}
            paddingX={10}
            w="100%"
            maxW="1600px"
            flexDirection={{ base: "column", md: "row" }}
        >
            <Heading
                color="primary.default"
                marginBottom={{ base: "5px", md: "0" }}
            >
                <NavLink to="/">Movies React</NavLink>
            </Heading>

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

            <Search showModel={props.showModel} />
        </HStack>
    );
};

export default Header;
