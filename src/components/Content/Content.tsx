import { useState } from "react";
import {
  GridItem,
  Heading,
  HStack,
  VStack,
  Text,
  Image,
} from "@chakra-ui/react";
import HoverContent from "../HoverContent/HoverContent";
import { img300, no_poster } from "../../utils/img";

interface Props {
  id: number;
  img: string;
  title: string;
  release_date: string;
  original_language: string;
  vote_average: number;
  media_type: string;
  overview: string;
  showModel: (id: number, media_type: string) => void;
}

const Content: React.FC<Props> = (props) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const {
    id,
    img,
    title,
    release_date,
    media_type,
    original_language,
    vote_average,
    overview,
  } = props;

  const contentViewHandler = () => {
    props.showModel(id, media_type);
  };

  const hoverEnterHandler = () => {
    setHovered(true);
  };

  const hoverLeaveHandler = () => {
    setHovered(false);
  };

  let media: string = media_type;
  if (media_type === "movie") {
    media = "Movie";
  } else if (media_type === "tv") {
    media = "TV Series";
  }

  console.log({ hovered, overview });
  return (
    <GridItem
      display="flex"
      flexDirection="column"
      alignItems="center"
      mb={5}
      position="relative"
    >
      {hovered && (
        <HoverContent
          title={title}
          original_language={original_language}
          vote_average={vote_average}
          media_type={media_type}
          overview={overview}
          hoverEnter={hoverEnterHandler}
          hoverLeave={hoverLeaveHandler}
          click={contentViewHandler}
        />
      )}
      <VStack position="relative" height="100%">
        <Image
          src={img ? `${img300}${img}` : no_poster}
          alt={title}
          height="100%"
          onClick={contentViewHandler}
          onMouseEnter={hoverEnterHandler}
          onMouseLeave={hoverLeaveHandler}
          cursor="pointer"
        />
        {vote_average !== 0 && (
          <Text
            position="absolute"
            top="-8px"
            right="0px"
            backgroundColor="#00FFCC"
            color="#222222"
            w="28px"
            borderRadius="0 0 0 5px"
            textAlign="center"
            marginTop="0px"
          >
            {vote_average === 10 ? 10 : vote_average.toFixed(1)}
          </Text>
        )}
      </VStack>
      <VStack
        flex="auto"
        justifyContent="space-between"
        p={1}
        w="100%"
        height="100px"
        maxWidth="90%"
      >
        <Heading
          fontSize="18px"
          fontWeight="600"
          textAlign="center"
          onClick={contentViewHandler}
          cursor="pointer"
        >
          {title}
        </Heading>
        <HStack w="100%" justifyContent="space-between">
          <HStack>
            <Text>{media}</Text>
            {original_language && (
              <Text
                borderRadius={5}
                backgroundColor="#00FFCC"
                color="#222222"
                px={2}
              >
                {original_language.toUpperCase()}
              </Text>
            )}
          </HStack>
          <Text>{release_date}</Text>
        </HStack>
      </VStack>
    </GridItem>
  );
};

export default Content;
