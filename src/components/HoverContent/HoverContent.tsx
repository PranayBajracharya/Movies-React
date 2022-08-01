import { Heading, HStack, VStack, Text } from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";

interface Props {
  title: string;
  media_type: string;
  original_language: string;
  vote_average: number;
  overview?: string;
  hoverEnter: () => void;
  hoverLeave: () => void;
  click: () => void;
}

const HoverContent: React.FC<Props> = (props) => {
  const {
    title,
    media_type,
    original_language,
    vote_average,
    overview,
    hoverEnter,
    hoverLeave,
    click,
  } = props;

  return (
    <>
      {overview && (
        <VStack
          position="absolute"
          bottom="0%"
          backgroundColor="secondary.default"
          zIndex="10"
          padding="10px"
          width="100%"
          maxHeight="100%"
          onMouseEnter={hoverEnter}
          onMouseLeave={hoverLeave}
        >
          <Heading
            color="primary.default"
            size="md"
            onClick={click}
            cursor="pointer"
            textAlign="center"
          >
            {title}
          </Heading>
          <HStack fontSize="15px">
            {media_type === "movie" && <Text>Movie</Text>}
            {media_type === "tv" && <Text>TV Series</Text>}
            {original_language && (
              <Text
                backgroundColor="#00FFCC"
                color="#222222"
                w="30px"
                borderRadius={5}
                textAlign="center"
              >
                {original_language.toUpperCase()}&nbsp;
              </Text>
            )}
            {vote_average !== 0 && (
              <>
                <Text color="#00FFCC">
                  <AiFillStar />
                  &nbsp;
                </Text>
                <Text>
                  {vote_average === 10 ? 10 : vote_average.toFixed(1)}
                </Text>
              </>
            )}
          </HStack>
          <VStack alignItems="flex-start">
            <Text
              maxHeight="150px"
              overflowY="hidden"
              textAlign="justify"
              fontSize="14px"
            >
              {overview}
            </Text>
          </VStack>
        </VStack>
      )}
    </>
  );
};

export default HoverContent;
