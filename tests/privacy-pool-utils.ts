import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import { Deposit, Withdrawal } from "../generated/templates/PrivacyPool/PrivacyPool"

export function createDepositEvent(
  commitment: Bytes,
  leaf: Bytes,
  asset: Address,
  denomination: BigInt,
  leafIndex: BigInt,
): Deposit {

  let mockEvent = newMockEvent()
  let depositEvent = changetype<Deposit>(mockEvent)

  depositEvent.parameters = new Array()

  depositEvent.parameters.push(
    new ethereum.EventParam(
      "commitment",
      ethereum.Value.fromFixedBytes(commitment)
    )
  )
  depositEvent.parameters.push(
    new ethereum.EventParam(
      "leaf",
      ethereum.Value.fromFixedBytes(leaf)
    )
  )
  depositEvent.parameters.push(
    new ethereum.EventParam(
      "asset",
      ethereum.Value.fromAddress(asset)
    )
  )
  depositEvent.parameters.push(
    new ethereum.EventParam(
      "denomination",
      ethereum.Value.fromUnsignedBigInt(denomination)
    )
  )
  depositEvent.parameters.push(
    new ethereum.EventParam(
      "leafIndex",
      ethereum.Value.fromUnsignedBigInt(leafIndex)
    )
  )

  return depositEvent
}


export function createWithdrawalEvent(
  recipient: Address,
  relayer: Address,
  subsetRoot: Bytes,
  nullifier: Bytes,
  fee: BigInt
): Withdrawal {

  let mockEvent = newMockEvent()
  let event = changetype<Withdrawal>(mockEvent)

  event.parameters = new Array()

  event.parameters.push(
    new ethereum.EventParam(
      "recipient",
      ethereum.Value.fromAddress(recipient)
    )
  )
  event.parameters.push(
    new ethereum.EventParam(
      "relayer",
      ethereum.Value.fromAddress(relayer)
    )
  )
  event.parameters.push(
    new ethereum.EventParam(
      "subsetRoot",
      ethereum.Value.fromFixedBytes(subsetRoot)
    )
  )
  event.parameters.push(
    new ethereum.EventParam(
      "nullifier",
      ethereum.Value.fromFixedBytes(nullifier)
    )
  )
  event.parameters.push(
    new ethereum.EventParam(
      "fee",
      ethereum.Value.fromUnsignedBigInt(fee)
    )
  )

  // need to mock input here because we decode
  // accessType, bitLength & subsetData from the calldata to save gas
  event.transaction.input = Bytes.fromHexString(
    "0xd922b60c000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000260177d73239555d10909943724cecb998e3df1829276e777e9063e5cd5cf182c791c9e33df944c2bd17199a688ac9499ceb332a3641d8d9f2df5757755beb1059d14de45cf3a708199e6635d969bed9943726651d84618c8346135cbefbeac3c750aebe7c5ed414a1cfd86311e830f8a72377be0c324c649991fc0a9e27896c67d09b49c738855ba8914c3df4a62e9c4457b91f34a2fcef7098a59703854ccaedc206994372098aeaf71fed60c67f6dcfd32daa1431e774d7a2b5cb3b15761c96c0016bf656b05a3e553ba39b2facc021244897a4bab29bc64bbe6ae70fec52d581409c660f68fb43bb9394077d0bbb0b36cb45c907f38bf3333ce155f1b58eea428940731699437280af4f7959bb35d6aedfae9b5d6f8d213e2f81beec83b3ebb1d6b8df358acfb40140e921985f70bf4ac79c1460680b29d510866eeae0425a8213b4bf6bbe9d19f183ef9038789ff98050cda53aa2932c494e75ede18b6460500000000000000000000000011b2e70f11799f5ef11d027d13d6be9101a5e82b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009184e72a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000"
  )

  return event
}
