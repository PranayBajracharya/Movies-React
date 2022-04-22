import { useState, useEffect } from "react";
import axios from "axios";

import { AiFillStar } from 'react-icons/ai';

import {
    Heading,
    HStack,
    VStack,
    Text,
    Image,
} from "@chakra-ui/react";

const gg = "https://www.movienewz.com/img/films/poster-holder.jpg";

type Model = {
    name?: string;
    title?: string;
    poster_path: string;
    overview: string;
    release_date?: string;
    first_air_date?: string;
    vote_average?: number;
    original_language: string;
    production_countries: {name:string}[];
    production_companies: {name:string}[];
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
                    <VStack mr={3}>
                        <Image
                            src={
                                aboutDetails.poster_path
                                    ? `https://image.tmdb.org/t/p/w400/${
                                          aboutDetails!.poster_path
                                      }`
                                    : gg
                            }
                            alt="asd"
                        />
                    </VStack>
                    <VStack alignItems="flex-start" w="60%">
                        <Heading color="primary.default">
                            {aboutDetails.name ?? aboutDetails.title}
                        </Heading>
                        <HStack>
                            {aboutDetails.vote_average !== 0 && (
                                <Text
                                backgroundColor="#00FFCC"
                                color="#222222"
                                w="36px"
                                borderRadius={5}
                                textAlign="center"
                                mr={3}
                            >
                                {aboutDetails.original_language.toUpperCase()} 
                            </Text>
                            )}
                            <Text color="#00FFCC"><AiFillStar /> </Text>
                            <Text>{aboutDetails.vote_average} </Text>
                        </HStack>
                        <Text>{aboutDetails.overview}</Text>
                        <VStack>
                            <Text>Country: {aboutDetails.production_countries[0].name}</Text>
                            <Text>Release: {aboutDetails.release_date ?? aboutDetails.first_air_date}</Text>
                            <Text>Production: {aboutDetails.production_companies[0].name}</Text>
                        </VStack>
                    </VStack>
                </>
            )}
        </HStack>
    );
};

export default AboutContent;
