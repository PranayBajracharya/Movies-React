import { useState, useEffect } from "react";
import axios from "axios";

import { Heading, HStack, VStack, Text, Image, Link } from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";

type Model = {
    name?: string;
    title?: string;
    poster_path: string;
    backdrop_path?: string;
    overview: string;
    release_date?: string;
    first_air_date?: string;
    vote_average?: number;
    original_language: string;
    production_countries: { name: string }[];
    production_companies: { name: string }[];
};

const HoverContent: React.FC<{
    details: { id: number; media_type: string } | null;
    hoverEnter: () => void;
    hoverLeave: () => void;
}> = (props) => {
    const [hoverDetails, setHoverDetails] = useState<Model | null>(null);
    const { details, hoverEnter, hoverLeave } = props;

    useEffect(() => {
        const fetchDetails = async () => {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/${details!.media_type}/${
                    details!.id
                }?api_key=7fd40db037363e45a0eb6dda8a0915b3&language=en-US`
            );
            setHoverDetails(data);
        };

        fetchDetails();
    }, [details]);

    return (
        <>
            {hoverDetails && (
                <VStack
                    position="absolute"
                    bottom="0%"
                    backgroundColor="secondary.default"
                    zIndex="10"
                    padding="10px"
                    width="100%"
                    maxHeight="100%"
                    onMouseEnter={hoverEnter}
                    onMouseLeave={hoverLeave}
                >
                    <VStack alignItems="flex-start">
                        <Heading color="primary.default" size="md">
                            {hoverDetails.name ?? hoverDetails.title}
                        </Heading>
                        <HStack fontSize="15px">
                            {details!.media_type === "movie" && (
                                <Text>Movie</Text>
                            )}
                            {details!.media_type === "tv" && (
                                <Text>TV Series</Text>
                            )}
                            {hoverDetails.original_language && (
                                <Text
                                    backgroundColor="#00FFCC"
                                    color="#222222"
                                    w="30px"
                                    borderRadius={5}
                                    textAlign="center"
                                >
                                    {hoverDetails.original_language.toUpperCase()}{" "}
                                </Text>
                            )}
                            {hoverDetails.vote_average !== 0 && (
                                <>
                                    <Text color="#00FFCC">
                                        <AiFillStar />{" "}
                                    </Text>
                                    <Text>{hoverDetails.vote_average}</Text>
                                </>
                            )}
                        </HStack>
                        <VStack alignItems="flex-start">
                            <Text
                                maxHeight="150px"
                                overflowY="hidden"
                                textAlign="justify"
                                fontSize="14px"
                            >
                                {hoverDetails.overview}
                            </Text>
                        </VStack>
                    </VStack>
                </VStack>
            )}
        </>
    );
};

export default HoverContent;
