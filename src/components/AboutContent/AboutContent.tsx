import { useState, useEffect } from "react";
import axios from "axios";

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
};

const AboutContent: React.FC<{
    details: { id: number; media_type: string } | null;
}> = (props) => {
    const [aboutDetails, setAboutDetails] = useState<Model | null>(null);
    const { details } = props;

    const fetchDetails = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${details!.media_type}/${
                details!.id
            }?api_key=7fd40db037363e45a0eb6dda8a0915b3&language=en-US`
        );
        console.log(data);
        setAboutDetails(data);
    };

    useEffect(() => {
        fetchDetails();
    }, []);

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
                        <Text>{aboutDetails.overview}</Text>
                    </VStack>
                </>
            )}
        </HStack>
    );
};

export default AboutContent;
