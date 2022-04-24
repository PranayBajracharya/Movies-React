import { useState, useEffect } from "react";
import axios from "axios";

import { Heading, HStack, VStack, Text, Image } from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";

import { no_poster } from "../../utils/img";

type Model = {
    name?: string;
    title?: string;
    poster_path: string;
    overview: string;
    release_date?: string;
    first_air_date?: string;
    vote_average?: number;
    original_language: string;
    production_countries: { name: string }[];
    production_companies: { name: string }[];
};

const AboutContent: React.FC<{
    details: { id: number; media_type: string } | null;
}> = (props) => {
    const [aboutDetails, setAboutDetails] = useState<Model | null>(null);
    const { details } = props;

    useEffect(() => {
        const fetchDetails = async () => {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/${details!.media_type}/${
                    details!.id
                }?api_key=7fd40db037363e45a0eb6dda8a0915b3&language=en-US`
            );
            console.log(data);
            setAboutDetails(data);
        };
        fetchDetails();
    }, [details]);

    return (
        <HStack color="alternate.default" alignItems="flex-start">
            {aboutDetails && (
                <>
                    <VStack mr={3} alignSelf="center">
                        <Image
                            src={
                                aboutDetails.poster_path
                                    ? `https://image.tmdb.org/t/p/w400/${
                                          aboutDetails!.poster_path
                                      }`
                                    : no_poster
                            }
                            alt="asd"
                        />
                    </VStack>
                    <VStack
                        alignItems="flex-start"
                        w="60%"
                        maxH="70vh"
                        overflowY="auto"
                    >
                        <Heading color="primary.default">
                            {aboutDetails.name ?? aboutDetails.title}
                        </Heading>
                        <HStack>
                            {details!.media_type === "movie" && <Text>Movie</Text>}
                            {details!.media_type === "tv" && <Text>TV Series</Text>}
                            <Text
                                backgroundColor="#00FFCC"
                                color="#222222"
                                w="36px"
                                borderRadius={5}
                                textAlign="center"
                                mr="100px"
                            >
                                {aboutDetails.original_language.toUpperCase()}{" "}
                            </Text>
                            {aboutDetails.vote_average !== 0 && (
                                <>
                                    <Text color="#00FFCC">
                                        <AiFillStar />{" "}
                                    </Text>
                                    <Text>{aboutDetails.vote_average}</Text>
                                </>
                            )}
                        </HStack>
                        <Text>{aboutDetails.overview}</Text>
                        <VStack alignItems="flex-start">
                            <Text>
                                Country:{" "}
                                {aboutDetails.production_countries[0].name}
                            </Text>
                            <Text>
                                Release:{" "}
                                {aboutDetails.release_date ??
                                    aboutDetails.first_air_date}
                            </Text>
                            <Text>
                                Production:{" "}
                                {aboutDetails.production_companies[0].name}
                            </Text>
                        </VStack>
                    </VStack>
                </>
            )}
        </HStack>
    );
};

export default AboutContent;
