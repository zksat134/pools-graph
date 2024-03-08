import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import { handleDeposit, handleWithdrawal } from "../src/privacy-pool"
import { createDepositEvent, createWithdrawalEvent } from "./privacy-pool-utils"
import { createPrivacyPoolCreatedEvent } from "./privacy-pool-factory-utils"
import { handlePrivacyPoolCreated } from "../src/privacy-pool-factory"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let asset = Address.fromString('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE')
    let denomination = BigInt.fromI32(100)
    let commitment = Bytes.fromHexString('0x1234567890')
    let leaf = Bytes.fromHexString('0x9876543210')
    let leafIndex = BigInt.fromI32(0)

    let newDepositEvent = createDepositEvent(
      commitment,
      leaf,
      asset,
      denomination,
      leafIndex,
    )
    let privacyPool = newDepositEvent.address
    let newPrivacyPoolCreatedEvent = createPrivacyPoolCreatedEvent(privacyPool, asset, denomination)

    handlePrivacyPoolCreated(newPrivacyPoolCreatedEvent)
    handleDeposit(newDepositEvent)

    let recipient = Address.fromString('0xf00df00df00df00df00df00df00df00df00df00d')
    let relayer = Address.fromString('0xc0dec0dec0dec0dec0dec0dec0dec0dec0dec0de')
    let subsetRoot = Bytes.fromHexString('0xfacefacefacefacefacefacefacefacefacefacefacefacefacefacefaceface')
    let nullifier = Bytes.fromHexString('0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef')
    let fee = BigInt.fromI32(42)

    let newWithdrawalEvent = createWithdrawalEvent(
      recipient,
      relayer,
      subsetRoot,
      nullifier,
      fee
    )
    handleWithdrawal(newWithdrawalEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Commitment created and stored", () => {
    assert.entityCount("Commitment", 1)
    assert.fieldEquals(
      "Commitment",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "id",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a"
    )
    assert.fieldEquals(
      "Commitment",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "commitment",
      "0x1234567890"
    )
    assert.fieldEquals(
      "Commitment",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "leaf",
      "0x9876543210"
    )
    assert.fieldEquals(
      "Commitment",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "asset",
      "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    )
    assert.fieldEquals(
      "Commitment",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "denomination",
      "100"
    )
    assert.fieldEquals(
      "Commitment",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "leafIndex",
      "0"
    )
    assert.fieldEquals(
      "Commitment",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "timestamp",
      "1"
    )
    assert.fieldEquals(
      "Commitment",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "pool",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a"
    )
    assert.fieldEquals(
      "Commitment",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "sender",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a"
    )
  })

  test("SubsetData created and stored", () => {
    assert.entityCount("SubsetData", 1)
    assert.fieldEquals(
      "SubsetData",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "id",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a"
    )
    assert.fieldEquals(
      "SubsetData",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "recipient",
      "0xf00df00df00df00df00df00df00df00df00df00d"
    )
    assert.fieldEquals(
      "SubsetData",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "relayer",
      "0xc0dec0dec0dec0dec0dec0dec0dec0dec0dec0de"
    )
    assert.fieldEquals(
      "SubsetData",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "subsetRoot",
      "0xfacefacefacefacefacefacefacefacefacefacefacefacefacefacefaceface"
    )
    assert.fieldEquals(
      "SubsetData",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "nullifier",
      "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef"
    )
    assert.fieldEquals(
      "SubsetData",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "fee",
      "42"
    )
    assert.fieldEquals(
      "SubsetData",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "timestamp",
      "1"
    )
    assert.fieldEquals(
      "SubsetData",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "pool",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a"
    )
    assert.fieldEquals(
      "SubsetData",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "sender",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a"
    )
    assert.fieldEquals(
      "SubsetData",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "accessType",
      "0"
    )
    assert.fieldEquals(
      "SubsetData",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "bitLength",
      "1"
    )
    assert.fieldEquals(
      "SubsetData",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "subsetData",
      "0x00"
    )
  })
})