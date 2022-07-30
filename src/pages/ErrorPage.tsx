import { Heading } from "@chakra-ui/react";

document.title = "Error";

const ErrorPage: React.FC = () => {
  return (
    <Heading color="primary.default" marginBottom={{ base: "5px", md: "0" }}>
      {"GARO XA :("}
    </Heading>
  );
};

export default ErrorPage;
