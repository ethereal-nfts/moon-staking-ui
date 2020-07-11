import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Text, Box, Button } from "@chakra-ui/core"
import addresses from "../contracts/addresses";
import NumericTxInput from "./NumericTxInput"

export default function ReferralCode({address}) {
  return (
    <Box w="100%" maxWidth="1200px" bg="white" m="0" ml="auto" mr="auto" mb="40px" mt={["10px","20px","20px","20px"]}
      p={["20px", "20px", "0px"]} pb="20px">
      <CopyToClipboard text={"https://stake.moon.dev/#/"+address}>
        <Button display="block" color="moon.buttonFgGray" bg="moon.buttonBgGray"
          h="50px" w="140px" float="right" mt="25px">
          Copy
        </Button>
      </CopyToClipboard>
      <Text fontSize="36px" color="moon.dark" width="100%">
        Referral Code
      </Text>
      <Text color="moon.blue" mt="10px" mb="10px">
        2% rewards when anyone uses to stake
      </Text>
      <Text wordBreak="break-word" p="15px" pl="25px" color="moon.dkGray" border="solid 1px" borderColor="moon.ltGray"
        w="100%" borderRadius="5px"
      >
        https://stake.moon.dev/#/{address}
      </Text>
    </Box>
  );
}
