import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { handlePrivacyPoolCreated } from "../src/privacy-pool-factory"
import { createPrivacyPoolCreatedEvent } from "./privacy-pool-factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let privacyPool = Address.fromString('0xf00df00df00df00df00df00df00df00df00df00d')
    let asset = Address.fromString('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE')
    let denomination = BigInt.fromI32(100)
    let newPrivacyPoolCreatedEvent = createPrivacyPoolCreatedEvent(privacyPool, asset, denomination)
    handlePrivacyPoolCreated(newPrivacyPoolCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Privacy pool created and stored", () => {
    assert.entityCount("PrivacyPool", 1)
    assert.fieldEquals(
      "PrivacyPool",
      "0xf00df00df00df00df00df00df00df00df00df00d",
      "id",
      "0xf00df00df00df00df00df00df00df00df00df00d"
    )
    assert.fieldEquals(
      "PrivacyPool",
      "0xf00df00df00df00df00df00df00df00df00df00d",
      "asset",
      "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    )
    assert.fieldEquals(
      "PrivacyPool",
      "0xf00df00df00df00df00df00df00df00df00df00d",
      "denomination",
      "100"
    )
  })
})
