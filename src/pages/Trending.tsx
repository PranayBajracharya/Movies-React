import { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@chakra-ui/react";

import Content from "../components/Content/Content";

const Trending: React.FC = () => {
    const [trending, setTrending] = useState<any[]>([]);

    const fetchTrending = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=7fd40db037363e45a0eb6dda8a0915b3&page=1`
        );
        console.log(data);
        setTrending(data.results);
    };

    useEffect(() => {
        fetchTrending();
    }, []);

    return (
        <Grid templateColumns="repeat(5, 1fr)" gap={6} mx={10} my={6} maxWidth="1600px" justifySelf="center">
            {trending &&
                trending.map((content) => (
                    <Content
                        key={content.id}
                        img={content!.poster_path}
                        title={content.title ?? content.name}
                        release_date={content.release_date ?? content.first_air_date}
                        original_language={content.original_language}
                        vote_average={content.vote_average}
                        media_type={content.media_type}
                    ></Content>
                ))}
        </Grid>
    );
};

export default Trending;
