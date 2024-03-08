import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { PrivacyPoolCreated } from "../generated/PrivacyPoolFactory/PrivacyPoolFactory"

export function createPrivacyPoolCreatedEvent(
  privacyPool: Address,
  asset: Address,
  denomination: BigInt,
): PrivacyPoolCreated {

  let mockEvent = newMockEvent()
  let privacyPoolCreatedEvent = changetype<PrivacyPoolCreated>(mockEvent)

  privacyPoolCreatedEvent.parameters = new Array()
  privacyPoolCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "privacyPool",
      ethereum.Value.fromAddress(privacyPool)
    )
  )
  privacyPoolCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "asset",
      ethereum.Value.fromAddress(asset)
    )
  )
  privacyPoolCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "denomination",
      ethereum.Value.fromUnsignedBigInt(denomination)
    )
  )

  return privacyPoolCreatedEvent
}
