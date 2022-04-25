import { useState, useEffect } from "react";
import axios from "axios";

import {
    HStack,
    Input,
    UnorderedList,
    ListItem,
    Text,
    Image,
    Heading,
    VStack,
} from "@chakra-ui/react";

import { BsSearch } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";

import { no_poster } from "../../utils/img";

document.addEventListener("click", (event: MouseEvent) => {
    const searchUL = event.target as Element;
    // console.log(searchUL)
    if (!searchUL.matches(".dropdown")) {
        const dropdown = document.getElementById("search-results");
        if (dropdown) {
            dropdown.style.display = "none";
        }
    }
});

//on focus on search field
const showResults = () => {
    const searchField = document.getElementById("search-results");
    if (searchField) {
        searchField.style.display = "block";
    }
};

type SearchResult = {
    id: number;
    title?: string;
    name?: string;
    media_type: string;
    poster_path?: string;
    vote_average?: number;
    release_date?: string;
    first_air_date?: string;
    original_language: string;
};

const Search: React.FC<{
    showModel: (id: number, media_type: string) => void;
}> = (props) => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [results, setResults] = useState<SearchResult[]>([]);

    const searchInputHandler = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setSearchInput(event.target.value.trim());
    };

    useEffect(() => {
        if (searchInput === "") {
            return;
        }
        let cancel: () => void;
        const search = async () => {
            try {
                const { data } = await axios.get(
                    `https://api.themoviedb.org/3/search/multi?api_key=7fd40db037363e45a0eb6dda8a0915b3&query=${searchInput}&page=1&include_adult=false`,
                    {
                        cancelToken: new axios.CancelToken((c) => (cancel = c)),
                    }
                );
                // console.log(data.results);

                const searchArray = data.results.filter(
                    (data: SearchResult, index: number) => {
                        if (index > 4) {
                            return false;
                        }
                        return (
                            data.media_type === "movie" ||
                            data.media_type === "tv"
                        );
                    }
                );
                // console.log(searchArray);
                setResults(searchArray);
                document.getElementById("search-results")!.style.display =
                    "block";
            } catch (e) {
                if (axios.isCancel(e)) return;
            }
        };
        search();
        return () => cancel();
    }, [searchInput]);

    const contentViewHandler = (id: number, media_type: string) => {
        // console.log(id, media_type);
        
        props.showModel(id, media_type);
    }

    return (
        <HStack
            border="1px solid #00FFCC"
            paddingRight="10px"
            position="relative"
            className="dropdown"
        >
            <Input
                className="dropdown"
                w="260px"
                placeholder="Enter Search Keyword"
                border="none"
                marginInlineStart="0px"
                _focus={{ outline: "none" }}
                onChange={searchInputHandler}
                onFocus={showResults}
            />
            ;
            <BsSearch className="dropdown" />
            {results.length > 0 && searchInput !== "" && (
                <UnorderedList
                    id="search-results"
                    position="absolute"
                    w="100%"
                    top="100%"
                    styleType="none"
                    zIndex="10"
                    backgroundColor="secondary.default"
                    // backgroundColor="red"
                    left="-0.5rem"
                    // padding="10px 0"
                >
                    {results.map((result) => (
                        <ListItem
                            key={result.id.toString()}
                            display="flex"
                            height="100px"
                            padding="5px"
                            onClick={contentViewHandler.bind(null, result.id, result.media_type)}
                        >
                            <Image
                                src={
                                    result.poster_path
                                        ? `https://image.tmdb.org/t/p/w400${result.poster_path}`
                                        : no_poster
                                }
                            ></Image>
                            <VStack
                                marginLeft="10px"
                                alignItems="flex-start"
                                fontSize="14px"
                            >
                                <Heading size="sm">
                                    {result.name ?? result.title}
                                </Heading>
                                <HStack>
                                    {result.media_type === "movie" && (
                                        <Text>Movie</Text>
                                    )}
                                    {result.media_type === "tv" && (
                                        <Text>TV Series</Text>
                                    )}
                                    {result.original_language && (
                                        <Text
                                            backgroundColor="#00FFCC"
                                            color="#222222"
                                            w="30px"
                                            borderRadius={5}
                                            textAlign="center"
                                        >
                                            {result.original_language.toUpperCase()}{" "}
                                        </Text>
                                    )}
                                    {result.vote_average !== 0 && (
                                        <>
                                            <Text color="#00FFCC">
                                                <AiFillStar />{" "}
                                            </Text>
                                            <Text>{result.vote_average}</Text>
                                        </>
                                    )}
                                </HStack>
                            </VStack>
                        </ListItem>
                    ))}
                </UnorderedList>
            )}
        </HStack>
    );
};

export default Search;