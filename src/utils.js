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
  let resultInteger = ""
  let resultDecimal = ""
  let resultSuffix = ""
  if(etherBN.div(toBN("1000000")).gt(toBN("0"))){
    resultSuffix = "M"
    resultInteger = etherBN.div(toBN("1000000")).toString()
    if(resultInteger.length < 3){
      resultDecimal = etherBN.sub(toBN(resultInteger).mul(toBN("1000000"))).toNumber() / 1000000
    }
  } else if(etherBN.div(toBN("1000")).gt(toBN("0"))) {
    resultSuffix = "K"
    resultInteger = etherBN.div(toBN("1000")).toString()
    if(resultInteger.length < 3){
      resultDecimal = etherBN.sub(toBN(resultInteger).mul(toBN("1000"))).toNumber() / 1000
    }
  } else{
    resultInteger = etherString
  }

  console.log("decimal",resultDecimal)
  console.log("integer",resultInteger)

  if(resultDecimal === "0") {
    if(resultInteger.length === 1) {
      resultDecimal = ".00"
    } else if(resultInteger.length === 2) {
      resultDecimal = ".0"
    }
  } else if(resultDecimal !== "") {
    if(resultInteger.length === 1) {
      resultDecimal = resultDecimal.toPrecision(2).substr(1)
    } else {
      resultDecimal = resultDecimal.toPrecision(1).substr(1)
    }
  }

  return resultInteger+resultDecimal+resultSuffix
}
