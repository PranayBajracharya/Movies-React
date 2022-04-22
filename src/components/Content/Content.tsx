import {
    GridItem,
    Heading,
    HStack,
    VStack,
    Text,
    Image,
} from "@chakra-ui/react";

const Content: React.FC<{
    id: number;
    img: string;
    title: string;
    release_date: string;
    original_language: string;
    vote_average: number;
    media_type: string;
    showModel: (id: number, media_type: string) => void;
}> = (props) => {
    const {
        id,
        img,
        title,
        release_date,
        media_type,
        original_language,
        vote_average,
    } = props;

    const contentViewHandler = () => {
        props.showModel(id, media_type);
    };

    let media = media_type;
    if (media_type === "movie") {
        media = "Movie";
    } else if (media_type === "tv") {
        media = "TV Series";
    }
    return (
        <GridItem
            display="flex"
            flexDirection="column"
            alignItems="center"
            mb={5}
            onClick={contentViewHandler}
        >
        
            <VStack position="relative">
                <Image src={`https://image.tmdb.org/t/p/w300/${img}`} alt={title} />
                {vote_average !== 0 && (
                    <Text
                        position="absolute"
                        top="-20px"
                        right="-10px"
                        backgroundColor="#00FFCC"
                        color="#222222"
                        w="28px"
                        borderRadius={5}
                        textAlign="center"
                    >
                        {vote_average}
                    </Text>
                )}
            </VStack>
            <VStack flex="auto" justifyContent="space-between" p={1} w="100%">
                <Heading fontSize="18px" fontWeight="600" textAlign="center">
                    {title}
                </Heading>
                <HStack w="100%" justifyContent="space-between">
                    <HStack>
                        <Text>{media}</Text>
                        <Text
                            borderRadius={5}
                            backgroundColor="#00FFCC"
                            color="#222222"
                            px={2}
                        >
                            {original_language.toUpperCase()}
                        </Text>
                    </HStack>
                    <Text>{release_date}</Text>
                </HStack>
            </VStack>
        </GridItem>
    );
};

export default Content;
// import Content from "../../interfaces/content";

// const Content: React.FC<{ content: Content }> = (props) => {
//     const { poster_path, title } = props;
//     return (
//         <GridItem
//             display="flex"
//             justifySelf="center"
//         >
//             <img src={`https://image.tmdb.org/t/p/w300/${poster_path}`}></img>
//             <Heading>{title}</Heading>
//         </GridItem>
//     );
// };

// export default Content;
