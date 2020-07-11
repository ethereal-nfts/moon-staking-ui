import React from 'react';
import { Text, Box, Flex, Link, Grid } from "@chakra-ui/core"
import addresses from "../contracts/addresses";

export default function Subheading({web3, address}) {

  return (
    <Box w="100%" bg="moon.bgGray" m="0" pb="20px">
      <Flex maxW="1200px" align="center" ml="auto" mr="auto" p="0px" pt="20px" pb="20px">
        <Grid templateRows="max-content" templateColumns="590px 285px 285px" w="100%" gap="20px">
          <Box p="0" >
            <Text fontWeight="bold" fontSize="36px" color="moon.dark" m="0" p="0">
              Moon Staking
            </Text>
            <Text color="moon.dkGray" mt="10px" mb="10px">
              Manage your current holdings and stake to earn more Moon.
            </Text>
            <Text color="moon.dkGray">
              Verified Moon Contract:
            </Text>
            <Link color="moon.blue" href={"https://etherscan.io/token/"+addresses.moonToken}>
              {addresses.moonToken}
            </Link>
          </Box>
          <Box bg="moon.violet" color="white" borderRadius="5px" p="15px">
            <Text w="100%" mt="5px">
              Your Staked Moon
            </Text>
            <Text fontSize="36px" w="100%">
              20k
            </Text>
            <Text w="100%">
              <Text as="span" color="moon.teal" >20%</Text> of Total Staked
            </Text>
          </Box>
          <Box bg="moon.violet" color="white" borderRadius="5px" p="15px">
            <Text w="100%" mt="5px" mb="15px">
              Your Moon Wallet
            </Text>
            <Text fontSize="36px" w="100%">
              10
            </Text>
          </Box>
        </Grid>
      </Flex>
    </Box>
  );
}
