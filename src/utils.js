export function removeDecimal(decimalString) {
  decimalString = decimalString.toString()
  if(!decimalString.includes('.')) return decimalString
  return decimalString.substring(0,decimalString.indexOf('.'))
}

export function shortEther(wei,web3) {
  if(wei===undefined || wei == null) return ""
  const toBN = web3.utils.toBN
  const fromWei = web3.utils.fromWei


  wei = wei.toString()
  if(wei === "") return ""

  const etherString = removeDecimal(fromWei(wei))
  const etherBN = toBN(etherString)
  let resultString = ""
  if(etherBN.div(toBN("10000000")).gt(toBN("0"))){
    resultString = etherBN.div(toBN("1000000")).toString()+"M"
  } else if(etherBN.div(toBN("10000")).gt(toBN("0"))) {
    resultString = etherBN.div(toBN("1000")).toString()+"K"
  } else{
    resultString = etherString
  }
  return resultString
}
