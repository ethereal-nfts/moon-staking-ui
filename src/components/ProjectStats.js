import React from 'react';
import { Text, Box, Flex, Image, Grid } from "@chakra-ui/core"
import addresses from "../contracts/addresses";
import {shortEther} from "../utils"

export default function ProjectStats({web3, address, totalMoon, totalMoonStaked, totalMoonStakers}) {
  const toBN = web3.utils.toBN
  return (
    <Box w="100%" bg="moon.bgGray" m="0" pb="20px">
      <Flex maxW="1200px" ml="auto" mr="auto" p={["20px", "20px", "0px"]} pt="20px" pb="20px">
        <Grid templateRows="max-content" templateColumns={["auto", "387px 387px 387px"]} w="100%" gap="20px">
          <Box bg="white" p="20px" pt="30px" pb="30px" border="solid" borderColor="moon.ltGray" borderRadius="5px" borderWidth="1px">
            <Image width="auto" height="70px" src="/logo.png" alt="Moon Logo" float="left" pr="20px" />
            <Text fontSize="36px" color="moon.dark" m="0" p="0" mt="-5px">
              {shortEther(totalMoon,web3)}
            </Text>
            <Text color="moon.dkGray" m="0" p="0" mt="-5px">
              Total Moon
            </Text>
          </Box>
          <Box bg="white" p="20px" pt="30px" pb="30px" border="solid" borderColor="moon.ltGray" borderRadius="5px" borderWidth="1px">
            <Image width="auto" height="70px" src="/logo.png" alt="Moon Logo" float="left" pr="20px" />
            <Text fontSize="36px" color="moon.dark" m="0" p="0" mt="-5px">
              {shortEther(totalMoonStaked,web3)}
            </Text>
            <Text color="moon.dkGray" m="0" p="0" mt="-5px">
              Total Staked Moon
            </Text>
            <Text fontSize="11px" color="moon.dkGray" m="0" p="0" mt="-5px">
              Percentage of Total Supply: <Text as="span" color="moon.ltViolet">{
                toBN(totalMoon).gt(toBN(0)) ?
                toBN(totalMoonStaked).mul(toBN("10000")).div(toBN(totalMoon)).toNumber()/100
                : "0"
              }%</Text>
            </Text>
          </Box>
          <Box bg="white" p="20px" pt="30px" pb="30px" border="solid" borderColor="moon.ltGray" borderRadius="5px" borderWidth="1px">
            <Image width="auto" height="70px" src="/logo.png" alt="Moon Logo" float="left" pr="20px" />
            <Text fontSize="36px" color="moon.dark" m="0" p="0" mt="-5px">
              {totalMoonStakers}
            </Text>
            <Text color="moon.dkGray" m="0" p="0" mt="-5px">
              Total Moon Stakers
            </Text>
          </Box>
        </Grid>
      </Flex>
    </Box>
  );
}
