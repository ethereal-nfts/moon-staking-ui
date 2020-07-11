import React, { useState, useEffect } from "react";
import { Text, Box, Flex, Button, Grid } from "@chakra-ui/core"
import addresses from "../contracts/addresses";
import NumericTxInput from "./NumericTxInput"

export default function Staking({web3, address, accountMoon, accountMoonStaked, moonStakingSC}) {
  const toWei = web3.utils.toWei
  const fromWei = web3.utils.fromWei
  const toBN = web3.utils.toBN

  let referralAddress = window.location.hash.substr(2);
  if(!referralAddress || referralAddress.length !== 42 ) referralAddress = "0x0000000000000000000000000000000000000000"

  const [stakeValue, setStakeValue] = useState("")
  const [stakeValueCap, setStakeValueCap] = useState("0")

  const [unstakeValue, setUnstakeValue] = useState("")
  const [unstakeValueCap, setUnstakeValueCap] = useState(toWei("0"))

  useEffect(()=>{
    setStakeValueCap(accountMoon)
  },[accountMoon])

  useEffect(()=>{
    setUnstakeValueCap(accountMoonStaked)
  },[accountMoonStaked])

  const handleStake = async ()=>{
    const requestBN = toBN(stakeValue)
    if(!web3 || !address || !moonStakingSC) {
      alert("You are not connected. Connect and try again.")
      return
    }
    if(requestBN.lt(toBN(toWei("10000")))){
      alert("At least 10000 MOON must be staked")
      return
    }
    if(requestBN.gt(toBN(accountMoon))){
      alert("Cannot stake more moon than is in your account.")
      return
    }
    await moonStakingSC.methods.stakeWithReferrer(stakeValue,referralAddress).send({from:address})
    alert("Stake request sent. Check your wallet to see when it has completed, then refresh this page.")
  }

  const handleUnstake = async ()=>{
    const requestBN = toBN(stakeValue)
    if(!web3 || !address || !moonStakingSC) {
      alert("You are not connected. Connect and try again.")
      return
    }
    if(requestBN.lt(toBN(toWei("1")))){
      alert("At least 1 MOON must be unstaked")
      return
    }
    if(requestBN.gt(toBN(accountMoonStaked))){
      alert("Cannot unstake more moon than you have already staked.")
      return
    }
    await moonStakingSC.methods.unstake(stakeValue).send({from:address})
    alert("Unstake request sent. Check your wallet to see when it has completed, then refresh this page.")
  }

  return (
    <Grid w="100%" maxWidth="1200px" bg="white" m="0" ml="auto" mr="auto"
      p={["20px", "20px", "0px"]} pb="20px"
      templateRows="max-content" templateColumns={["auto", "1fr 1fr", "1fr 1fr", "1fr 1fr"]} gap="20px" mt="40px"
    >
      <Box p="0px">
        <NumericTxInput
          web3={web3}
          address={address}
          cap={stakeValueCap}
          min={toWei("10000")}
          setVal={setStakeValue}
          val={stakeValue}
          handleClick={()=>handleStake()}
          name="Stake Moon"
          description="10,000 Token Minimum"
          placeholder="Amount of Moon to Stake"
        />
      </Box>
      <Box p="0">
        <NumericTxInput
          web3={web3}
          address={address}
          cap={unstakeValueCap}
          min={toWei("1")}
          setVal={setUnstakeValue}
          val={unstakeValue}
          handleClick={()=>handleUnstake()}
          name="Unstake Moon"
          description="Fee: 4% Burn, 4% Tax, 2% Referral"
          placeholder="Amount of Moon to Unstake"
        />
      </Box>
    </Grid>
  );
}
