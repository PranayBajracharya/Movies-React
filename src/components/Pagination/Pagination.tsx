import { HStack, UnorderedList, ListItem, Button } from "@chakra-ui/react";
import { useState } from "react";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

const Pagination: React.FC<{
    page: number;
    setPage: (page: number) => void;
}> = (props) => {
    const [showPages, setShowPages] = useState<number>(0);

    const showPage = [
        5 * showPages + 1,
        5 * showPages + 2,
        5 * showPages + 3,
        5 * showPages + 4,
        5 * showPages + 5,
    ];

    const changePageHandler = (goToPage: number) => {
        props.setPage(goToPage);
    };

    const showPagesDownHandler = () => {
        if(showPages > 0) {
            setShowPages(showPages - 1);
        }
    }

    const showPagesLowHandler = () => {
        setShowPages(0);
    }
    
    const showPagesHighHandler = () => {
        setShowPages(19);
    }

    const showPagesUpHandler = () => {
        if(showPages < 19) {
            setShowPages(showPages + 1);
        }
    }

    return (
        <HStack paddingBottom="20px">
            <Button variant="primary" onClick={showPagesLowHandler} >
                <HiChevronDoubleLeft />
            </Button>
            <Button variant="primary" onClick={showPagesDownHandler} >
                <FiChevronLeft />
            </Button>
            <UnorderedList styleType="none" display="flex">
                {showPage.map((goToPage) => (
                    <ListItem key={goToPage}>
                        {props.page === goToPage ? (
                            <Button
                                variant="active"
                                onClick={changePageHandler.bind(null, goToPage)}
                            >
                                {goToPage}
                            </Button>
                        ) : (
                            <Button
                                variant="primary"
                                onClick={changePageHandler.bind(null, goToPage)}
                            >
                                {goToPage}
                            </Button>
                        )}
                    </ListItem>
                ))}
            </UnorderedList>
            <Button variant="primary" onClick={showPagesUpHandler} >
                <FiChevronRight />
            </Button>
            <Button variant="primary" onClick={showPagesHighHandler} >
                <HiChevronDoubleRight />
            </Button>
        </HStack>
    );
};

export default Pagination;
