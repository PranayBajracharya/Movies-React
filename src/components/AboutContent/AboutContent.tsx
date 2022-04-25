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

type Cast = {
    id: number;
    name: string;
    profile_path: string;
};

const AboutContent: React.FC<{
    details: { id: number; media_type: string } | null;
}> = (props) => {
    const [aboutDetails, setAboutDetails] = useState<Model | null>(null);
    const [casts, setCasts] = useState<Cast[] | null>(null);
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

    useEffect(() => {
        const fetchCast = async () => {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/${details!.media_type}/${
                    details!.id
                }/credits?api_key=7fd40db037363e45a0eb6dda8a0915b3&language=en-US`
            );
            console.log(data.cast);
            setCasts(data.cast);
        };
        fetchCast();
    }, [details]);

    return (
        <HStack color="alternate.default" alignItems="flex-start" maxH="80vh">
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
                        w="60%"
                        alignItems="flex-start"
                        overflowY="auto"
                        h="100%"
                    >
                        <VStack>
                            <Heading color="primary.default">
                                {aboutDetails.name ?? aboutDetails.title}
                            </Heading>
                            <HStack>
                                {details!.media_type === "movie" && (
                                    <Text>Movie</Text>
                                )}
                                {details!.media_type === "tv" && (
                                    <Text>TV Series</Text>
                                )}
                                {aboutDetails.original_language && (
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
                                )}
                                {aboutDetails.vote_average !== 0 && (
                                    <>
                                        <Text color="#00FFCC">
                                            <AiFillStar />{" "}
                                        </Text>
                                        <Text>{aboutDetails.vote_average}</Text>
                                    </>
                                )}
                            </HStack>
                            <VStack alignItems="flex-start" overflowY="auto" maxHeight="170px">
                                <Text>{aboutDetails.overview}</Text>
                                <VStack alignItems="flex-start">
                                    {aboutDetails.production_countries && (
                                        <Text>
                                            Country:{" "}
                                            {
                                                aboutDetails
                                                    .production_countries[0]
                                                    .name
                                            }
                                        </Text>
                                    )}
                                    {(aboutDetails.release_date ||
                                        aboutDetails.first_air_date) && (
                                        <Text>
                                            Release:{" "}
                                            {aboutDetails.release_date ??
                                                aboutDetails.first_air_date}
                                        </Text>
                                    )}
                                    {aboutDetails.production_companies && (
                                        <Text>
                                            Production:{" "}
                                            {
                                                aboutDetails
                                                    .production_companies[0]
                                                    .name
                                            }
                                        </Text>
                                    )}
                                </VStack>
                            </VStack>
                        </VStack>
                        <VStack w="100%">
                            <Heading color="primary.default" size="lg">
                                Cast
                            </Heading>
                            <HStack
                                overflowX="auto"
                                overflowY="hidden"
                                w="100%"
                                // h="30%"
                                // minH="150px"
                            >
                                {casts &&
                                    casts.map((cast) => (
                                        <VStack minW="20%" h="100%">
                                            <Image
                                                src={
                                                    cast.profile_path
                                                        ? `https://image.tmdb.org/t/p/w200${cast.profile_path}`
                                                        : no_poster
                                                }
                                                alt={cast.id.toString()}
                                            ></Image>
                                            <Text
                                                display="flex"
                                                alignItems="center"
                                                textAlign="center"
                                                height="40px"
                                                lineHeight="20px"
                                            >
                                                {cast.name}
                                            </Text>
                                        </VStack>
                                    ))}
                                ;
                            </HStack>
                        </VStack>
                    </VStack>
                </>
            )}
        </HStack>
    );
};

export default AboutContent;
