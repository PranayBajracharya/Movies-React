import { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@chakra-ui/react";

import Content from "../components/Content/Content";

const TVSeries: React.FC<{ showModel: () => void; }> = (props) => {
    const [tvSeries, setTVSeries] = useState<any[]>([]);

    const fetchTVSeries = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/tv?api_key=7fd40db037363e45a0eb6dda8a0915b3&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
        );
        console.log(data);
        setTVSeries(data.results);
    };

    useEffect(() => {
        fetchTVSeries();
    }, []);

    return (
        <Grid templateColumns="repeat(5, 1fr)" gap={6} mx={10} my={6} maxWidth="1600px" justifySelf="center">
            {tvSeries &&
                tvSeries.map((content) => (
                    <Content
                        key={content.id}
                        img={content!.poster_path}
                        title={content.title ?? content.name}
                        release_date={content.release_date ?? content.first_air_date}
                        original_language={content.original_language}
                        vote_average={content.vote_average}
                        media_type="TV Series"
                        showModel={props.showModel}
                    ></Content>
                ))}
        </Grid>
    );
};

export default TVSeries;
