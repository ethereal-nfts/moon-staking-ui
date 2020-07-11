import React, { useState, useEffect } from "react";
import { Text, Box, Flex, Button, Grid } from "@chakra-ui/core"
import addresses from "../contracts/addresses"
import {shortEther} from "../utils"

export default function Rewards({web3, address, accountDividends, accountReferralRewards, moonStakingSC }) {
  const toWei = web3.utils.toWei
  const fromWei = web3.utils.fromWei
  const toBN = web3.utils.toBN

  const handleReinvest = async ()=>{
    if(!web3 || !address || !moonStakingSC) {
      alert("You are not connected. Connect and try again.")
      return
    }
    if(toBN(accountDividends).lt(toBN(toWei("1")))){
      alert("You must have at least 1 MOON in dividends.")
      return
    }
    await moonStakingSC.methods.reinvest().send({from:address})
    alert("Reinvest request sent. Check your wallet to see when it has completed, then refresh this page.")
  }

  const handleWithdraw = async ()=>{
    if(!web3 || !address || !moonStakingSC) {
      alert("You are not connected. Connect and try again.")
      return
    }
    if(toBN(accountDividends).lt(toBN(toWei("1")))){
      alert("You must have at least 1 MOON in dividends.")
      return
    }
    await moonStakingSC.methods.withdraw().send({from:address})
    alert("Withdraw request sent. Check your wallet to see when it has completed, then refresh this page.")
  }

  const handleReferralWithdraw = async ()=>{
    if(!web3 || !address || !moonStakingSC) {
      alert("You are not connected. Connect and try again.")
      return
    }
    if(toBN(accountReferralRewards).lt(toBN(toWei("1")))){
      alert("You must have at least 1 MOON in referral rewards.")
      return
    }
    await moonStakingSC.methods.claimReferralRewards().send({from:address})
    alert("Referral withdraw request sent. Check your wallet to see when it has completed, then refresh this page.")
  }

  return (
    <Grid w="100%" maxWidth="1200px" bg="white" m="0" ml="auto" mr="auto"
      p={["20px", "20px", "0px"]} pb="20px"
      templateRows="max-content" templateColumns={["auto", "1fr 1fr", "1fr 1fr", "1fr 1fr"]} gap="20px"
    >
      <Box p="20px" border="solid 1px" borderColor="moon.ltGray" borderRadius="5px">
        <Text fontSize="36px" color="moon.dark" width="100%" borderBottom="solid 1px" borderColor="moon.ltGray">
          Dividends
        </Text>
        <Text fontSize="60px" color="moon.dark" width="100%" borderBottom="solid 1px" borderColor="moon.ltGray">
          {shortEther(accountDividends,web3)}
        </Text>
        <Text color="moon.dkGray" mt="10px" mb="10px">
          Moon Dividends
        </Text>
        <Button display="inline-block" color="white" bg="moon.violet" h="50px" w="240px" mt="20px" mr="20px"
          onClick={()=>handleReinvest()}
        >
          Reinvest
        </Button>
        <Button display="inline-block" color="white" bg="moon.violet" h="50px" w="240px" mt="20px"
          onClick={()=>handleWithdraw()}
        >
          Withdraw
        </Button>
      </Box>
      <Box p="20px" border="solid 1px" borderColor="moon.ltGray" borderRadius="5px">
        <Text fontSize="36px" color="moon.dark" width="100%" borderBottom="solid 1px" borderColor="moon.ltGray">
          Referral Rewards
        </Text>
        <Text fontSize="60px" color="moon.dark" width="100%" borderBottom="solid 1px" borderColor="moon.ltGray">
          {shortEther(accountReferralRewards,web3)}
        </Text>
        <Text color="moon.dkGray" mt="10px" mb="10px">
          Moon Referrals
        </Text>
        <Button display="inline-block" color="white" bg="moon.violet" h="50px" w="240px" mt="20px"
          onClick={()=>handleReferralWithdraw()}
        >
          Withdraw
        </Button>
      </Box>
    </Grid>
  );
}
