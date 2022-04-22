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
            <Heading>Movies React</Heading>

            <UnorderedList display="flex" styleType="none">
                <ListItem mx={5}>Home</ListItem>
                <ListItem mx={5}>Movies</ListItem>
                <ListItem mx={5}>TV-Series</ListItem>
            </UnorderedList>

            <Input w="250px" />
        </HStack>
    );
};

export default Header;
