import React from 'react';
import { Text, Box, Flex, Link, Grid } from "@chakra-ui/core"
import addresses from "../contracts/addresses"
import {shortEther} from "../utils"

export default function Subheading({web3, address, accountMoonStaked, accountMoon, totalMoonStaked}) {
  const toBN = web3.utils.toBN
  return (
    <Box w="100%" bg="moon.bgGray" m="0" p={["20px", "20px", "0px"]} pt="0px" pb="20px" >
      <Flex w="100%" maxW="1200px" align="center" ml="auto" mr="auto" p="0px" pt="20px" pb="20px">
        <Grid w="100%" gap="20px" maxWidth="100vw"
          templateRows={["max-content max-content max-content", "max-content max-content", "max-content"]}
          templateColumns={["auto", "auto auto", "285px 285px 285px 285px"]}>
          <Box p="0" gridColumn={["span 1", "span 2", "span 2", "span 2"]}>
            <Text fontWeight="bold" fontSize="36px" color="moon.dark" m="0" p="0">
              Moon Staking
            </Text>
            <Text w="100%" color="moon.dkGray" mt="10px" mb="10px">
              Manage your current holdings and stake to earn more Moon.
            </Text>
            <Text color="moon.dkGray">
              Verified Moon Contract:
            </Text>
            <Link wordBreak="break-word" color="moon.blue" href={"https://etherscan.io/token/"+addresses.moonToken}>
              {addresses.moonToken}
            </Link>
          </Box>
          <Box  w="100%" bg="moon.violet" color="white" borderRadius="5px" p="15px">
            <Text w="100%" mt="5px">
              Your Staked Moon
            </Text>
            <Text fontSize="36px" w="100%">
              {shortEther(accountMoonStaked,web3)}
            </Text>
            <Text w="100%">
              <Text as="span" color="moon.teal" >{
                toBN(totalMoonStaked).gt(toBN(0)) ?
                toBN(accountMoonStaked).mul(toBN("10000")).div(toBN(totalMoonStaked)).toNumber()/100
                : "0"
              }%</Text> of Total Staked
            </Text>
          </Box>
          <Box  w="100%" bg="moon.violet" color="white" borderRadius="5px" p="15px">
            <Text w="100%" mt="5px" mb="15px">
              Your Moon Wallet
            </Text>
            <Text fontSize="36px" w="100%">
              {shortEther(accountMoon,web3)}
            </Text>
          </Box>
        </Grid>
      </Flex>
    </Box>
  );
}
