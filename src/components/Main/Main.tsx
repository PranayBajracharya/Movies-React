import { Grid, GridItem } from '@chakra-ui/react';

const Main:React.FC = () => {
    return (
        <Grid templateColumns='repeat(5, 1fr)' gap={5}>
            <GridItem>Batman</GridItem>
            <GridItem>Superman</GridItem>
            <GridItem>Catwoman</GridItem>
            <GridItem>Batman</GridItem>
            <GridItem>Superman</GridItem>
            <GridItem>Catwoman</GridItem>
            <GridItem>Batman</GridItem>
            <GridItem>Superman</GridItem>
            <GridItem>Catwoman</GridItem>
            <GridItem>Batman</GridItem>
            <GridItem>Superman</GridItem>
            <GridItem>Catwoman</GridItem>
        </Grid>
    );
};

export default Main;