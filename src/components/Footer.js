import React from 'react';
import { Text, Box, Link, Image } from "@chakra-ui/core"
import addresses from "../contracts/addresses";

export default function Footer() {

  return (
    <>
      <Box w="100%" minH="100px" bg="white" color="gray.200"
      position="relative"  p="20px" pt="20px"
        textAlign="center" fontSize="18px" border-top="solid 1px gray"
        ml="auto" mr="auto" borderTop="solid 1px" borderColor="moon.ltGray" >
        <Link display="inline-block" href="https://moon.dev" m="0px" >
          <Image src="/moon_h.png" alt="Moon.Dev Website" w="auto" h="65px" m="0px" />
        </Link>
        <Text color="moon.buttonFgGray" m="0px">
        © 2020 Moon
        </Text>
      </Box>
    </>
  );
}
