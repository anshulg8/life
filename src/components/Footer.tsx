import React from "react";
import { Box, Link, Text } from "@chakra-ui/react";

const Footer: React.FC = () => {
  return (
    <Box as="footer" mt={8} textAlign="center" py={4}>
      <Text fontSize="sm" color="gray.500">
        Made with ❤️ in 🇮🇳 by{" "}
        <Link href="https://anshulgarg.in" color="blue.500" isExternal>
          Anshul Garg
        </Link>
        . Check out the code on{" "}
        <Link href="https://github.com/anshulg8" color="blue.500" isExternal>
          Github
        </Link>
        .
      </Text>
    </Box>
  );
};

export default Footer;
