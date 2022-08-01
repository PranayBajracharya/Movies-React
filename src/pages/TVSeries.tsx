import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, VStack } from "@chakra-ui/react";

import Content from "../components/Content/Content";
import Pagination from "../components/Pagination/Pagination";

const TVSeries: React.FC<{
  showModel: (id: number, media_type: string) => void;
}> = (props) => {
  const [page, setPage] = useState<number>(1);
  const [tvSeries, setTVSeries] = useState<any[]>([]);

  useEffect(() => {
    document.title = "TV-Series | Movies React";
  }, []);

  useEffect(() => {
    const fetchTVSeries = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
      );
      setTVSeries(data.results);
    };
    window.scrollTo(0, 0);
    fetchTVSeries();
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
        {tvSeries &&
          tvSeries.map((content) => (
            <Content
              key={content.id}
              id={content.id}
              img={content!.poster_path}
              title={content.title ?? content.name}
              release_date={content.release_date ?? content.first_air_date}
              original_language={content.original_language}
              vote_average={content.vote_average}
              overview={content?.overview}
              media_type="tv"
              showModel={props.showModel}
            ></Content>
          ))}
      </Grid>
      <Pagination page={page} setPage={setPage} />
    </VStack>
  );
};

export default TVSeries;
