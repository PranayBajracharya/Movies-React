import { useState, useEffect } from "react";
import axios from "axios";

import { Heading, HStack, VStack, Text, Image } from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";

import { img200, img400, img500, no_poster } from "../../utils/img";

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
            // console.log("Data", data);
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
            // console.log("Cast", data.cast);
            setCasts(data.cast);
        };
        fetchCast();
    }, [details]);

    return (
        // <HStack
        //     color="alternate.default"
        //     justifyContent="space-between"
        //     alignItems="stretch"
        // >
        <>
            {aboutDetails && (
                <>
                    <VStack mr={3} alignSelf="center">
                        <Image
                            display={{base: "none", md: "block"}}
                            src={
                                aboutDetails.poster_path
                                    ? `${img400}${aboutDetails!.poster_path}`
                                    : no_poster
                            }
                            alt={aboutDetails.name ?? aboutDetails.title}
                        />
                        <Image
                            display={{base: "block", md: "none"}}
                            src={
                                aboutDetails.backdrop_path
                                    ? `${img500}${aboutDetails!.backdrop_path}`
                                    : no_poster
                            }
                            alt={aboutDetails.name ?? aboutDetails.title}
                        />
                    </VStack>
                    <VStack
                        w={{sm: "100%", md: "60%"}}
                        h={{sm: "60%", md: "auto"}}
                        margin={{base: "10px", md: "auto"}}
                        justifyContent="space-between"
                        overflowY="auto"
                        overflowX={{sm: "auto", md: "hidden"}}
                    >
                        <VStack alignItems="flex-start">
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
                            <VStack alignItems="flex-start">
                                <Text
                                    maxHeight={{sm: "max-content", md: "115px"}}
                                    overflowY="auto"
                                    textAlign="justify"
                                    marginBottom="5px"
                                    paddingRight="10px"
                                >
                                    {aboutDetails.overview}
                                </Text>
                                <VStack
                                    alignItems="flex-start"
                                    lineHeight="20px"
                                >
                                    {aboutDetails.production_countries.length >
                                        0 && (
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
                                    {aboutDetails.production_companies.length >
                                        0 && (
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
                        {casts && casts!.length > 0 && (
                            <VStack w="100%" alignItems="flex-start" mt="20px">
                                <Heading color="primary.default" size="lg">
                                    Cast
                                </Heading>
                                <HStack
                                    overflowX="auto"
                                    overflowY="hidden"
                                    w="100%"
                                >
                                    {casts.map((cast) => (
                                        <VStack
                                            minW="20%"
                                            h="100%"
                                            key={cast.id}
                                            marginBottom="5px"
                                        >
                                            <Image
                                                src={
                                                    cast.profile_path
                                                        ? `${img200}${cast.profile_path}`
                                                        : no_poster
                                                }
                                                alt={cast.id.toString()}
                                                maxH="150px"
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
                                </HStack>
                            </VStack>
                        )}
                    </VStack>
                </>
            )}
        </>
        // </HStack>
    );
};

export default AboutContent;
