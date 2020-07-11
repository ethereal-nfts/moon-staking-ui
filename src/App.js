import React, { useState, useEffect } from "react";
import addresses from "./contracts/addresses";
import abis from "./contracts/abis";
import { ThemeProvider, CSSReset } from "@chakra-ui/core"
import theme from "./theme"
import "./App.css";

import Web3 from "web3";
import Web3Modal from "web3modal";

import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
import Torus from "@toruslabs/torus-embed";
import Authereum from "authereum";
import UniLogin from "@unilogin/provider";
import Portis from "@portis/web3";
import Squarelink from "squarelink";
import MewConnect from "@myetherwallet/mewconnect-web-client";

import Footer from "./components/Footer"
import Header from "./components/Header"
import Subheading from "./components/Subheading"
import ProjectStats from "./components/ProjectStats"
import Staking from "./components/Staking"
import Rewards from "./components/Rewards"
import ReferralCode from "./components/ReferralCode"

const INFURA_ID = "d12985cdddeb431ba4a7069ee57ba133"

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID // required
    }
  },
  fortmatic: {
    package: Fortmatic, // required
    options: {
      key: "pk_live_522E2B32F46FB16A" // required
    }
  },
  torus: {
    package: Torus, // required
  },
  authereum: {
    package: Authereum // required
  },
  unilogin: {
    package: UniLogin // required
  },
  portis: {
    package: Portis, // required
    options: {
      id: "12f64063-f3e7-4bed-bb31-8c6dd697867b" // required
    }
  },
  squarelink: {
    package: Squarelink, // required
    options: {
      id: "88f1885b8489c400f03b" // required
    }
  },
  mewconnect: {
    package: MewConnect, // required
    options: {
      infuraId: INFURA_ID // required
    }
  }
};

console.log(Web3Modal)

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions // required
});



function App() {

  const [address, setAddress] = useState("")
  const [provider, setProvider] = useState(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/'+INFURA_ID))
  const [web3, setWeb3] = useState(new Web3(provider))
  const [connected, setConnected] = useState(false)

  const [time, setTime] = useState(Date.UTC(2020,6,4,13,30,0,0))
  const [isActive, setIsActive] = useState(Date.now() > time)

  const [moonTokenSC, setMoonTokenSC] = useState(null)
  const [moonStakingSC, setMoonStakingSC] = useState(null)

  const [totalMoon, setTotalMoon] = useState("0")
  const [totalMoonStaked, setTotalMoonStaked] = useState("0")
  const [totalMoonStakers, setTotalMoonStakers] = useState("0")
  const [accountMoon, setAccountMoon] = useState("0")
  const [accountMoonStaked, setAccountMoonStaked] = useState("0")
  const [accountDividends, setAccountDividends] = useState("0")
  const [accountReferralRewards, setAccountReferralRewards] = useState("0")

  useEffect(()=>{
    if(!web3) return
    if(!address) return

    const moonTokenSC = new web3.eth.Contract(abis.moonToken, addresses.moonToken)
    const moonStakingSC = new web3.eth.Contract(abis.moonStaking, addresses.moonStaking)
    if (!moonTokenSC) return
    if (!moonStakingSC) return


    let fetchData = async(web3,address,moonTokenSC,moonStakingSC)=>{
      const [
        totalMoon,
        totalMoonStaked,
        totalMoonStakers,
        accountMoon,
        accountMoonStaked,
        accountDividends,
        accountReferralRewards,
      ] = await Promise.all([
        moonTokenSC.methods.totalSupply().call(),
        moonStakingSC.methods.totalStaked().call(),
        moonStakingSC.methods.totalStakers().call(),
        moonTokenSC.methods.balanceOf(address).call(),
        moonStakingSC.methods.stakeValue(address).call(),
        moonStakingSC.methods.dividendsOf(address).call(),
        moonStakingSC.methods.referralPayouts(address).call()
      ])

      setTotalMoon(totalMoon)
      setTotalMoonStaked(totalMoonStaked)
      setTotalMoonStakers(totalMoonStakers)
      setAccountMoon(accountMoon)
      setAccountMoonStaked(accountMoonStaked)
      setAccountDividends(accountDividends)
      setAccountReferralRewards(accountReferralRewards)
    }


    fetchData(web3,address,moonTokenSC,moonStakingSC)

    let interval;
    if(window.web3){
      interval = setInterval((web3,address,moonTokenSC,moonStakingSC)=>{
        if(!web3 || !address || !moonTokenSC || !moonStakingSC) return
        fetchData(web3,address,moonTokenSC,moonStakingSC)
      },2000)
    }else{
      interval = setInterval((web3,address,moonTokenSC,moonStakingSC)=>{
        if(!web3 || !address || !moonTokenSC || !moonStakingSC) return
        fetchData(web3,address,moonTokenSC,moonStakingSC)
      },10000)
    }

    return ()=>clearInterval(interval)

  },[web3,address])


  const resetApp = async () => {
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
    }
    await web3Modal.clearCachedProvider();
    setAddress("")
    setWeb3(null)
    setProvider(null)
    setConnected(false)
  };

  const subscribeProvider = async (provider,web3) => {
      if (!provider.on) {
        return
      }
      provider.on("close", () => resetApp(web3));
      provider.on("accountsChanged", async (accounts) => {
        setAddress(accounts[0])
      });
    };

  const onConnect = async () => {
    const provider = await web3Modal.connect()
    const web3 = await new Web3(provider)
    await subscribeProvider(provider,web3)
    const accounts = await web3.eth.getAccounts()
    const address = accounts[0]

    setConnected(true)
    setAddress(address)
    setProvider(provider)
    setWeb3(web3)
  }

  useEffect(()=>{
    if(window.web3) onConnect()
  },[])

  useEffect(()=>{
    if(!web3) return

    const moonTokenSC = new web3.eth.Contract(abis.moonToken, addresses.moonToken)
    const moonStakingSC = new web3.eth.Contract(abis.moonStaking, addresses.moonStaking)
    if (!moonTokenSC) return
    if (!moonStakingSC) return
    setMoonTokenSC(moonTokenSC)
    setMoonStakingSC(moonStakingSC)

  },[web3])

  useEffect(()=>{
    if(Date.now() < time){
      let interval = setInterval(()=>{
        setIsActive(Date.now() > time)
      },500)
      return ()=>clearInterval(interval)
    }
  },[time])

  return (
    <ThemeProvider theme={theme} >
      <CSSReset />
      <Header web3={web3} address={address} onConnect={onConnect} />
      <Subheading web3={web3} address={address}
        accountMoonStaked={accountMoonStaked} accountMoon={accountMoon} totalMoonStaked={totalMoonStaked}
      />
      <ProjectStats web3={web3} address={address}
        totalMoon={totalMoon} totalMoonStaked={totalMoonStaked} totalMoonStakers={totalMoonStakers}
      />
      <Staking web3={web3} address={address}
        accountMoon={accountMoon} accountMoonStaked={accountMoonStaked} moonStakingSC={moonStakingSC}
      />
      <Rewards web3={web3} address={address}
        accountDividends={accountDividends} accountReferralRewards={accountReferralRewards} moonStakingSC={moonStakingSC}
      />
      <ReferralCode address={address} />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
