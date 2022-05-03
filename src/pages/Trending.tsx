import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, VStack } from "@chakra-ui/react";

import Content from "../components/Content/Content";
import Pagination from "../components/Pagination/Pagination";

const Trending: React.FC<{
    showModel: (id: number, media_type: string) => void;
}> = (props) => {
    const [page, setPage] = useState<number>(1);
    const [trending, setTrending] = useState<any[]>([]);

    useEffect(() => {
        document.title = "Home | Movies React";
     }, []);

    useEffect(() => {
        const fetchTrending = async () => {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/trending/all/day?api_key=7fd40db037363e45a0eb6dda8a0915b3&page=${page}`
            );
            // console.log(data);
            setTrending(data.results);
        };
        window.scrollTo(0, 0);
        fetchTrending();
    }, [page]);

    return (
        <VStack>
            <Grid
                templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(4, 1fr)",
                    xl: "repeat(5, 1fr)",
                }}
                gap={6}
                mx={10}
                my={6}
                maxWidth="1600px"
                justifySelf="center"
            >
                {trending &&
                    trending.map((content) => (
                        <Content
                            key={content.id}
                            id={content.id}
                            img={content!.poster_path}
                            title={content.title ?? content.name}
                            release_date={
                                content.release_date ?? content.first_air_date
                            }
                            original_language={content.original_language}
                            vote_average={content.vote_average}
                            media_type={content.media_type}
                            showModel={props.showModel}
                        ></Content>
                    ))}
            </Grid>
            <Pagination page={page} setPage={setPage}/>
        </VStack>
    );
};

export default Trending;
