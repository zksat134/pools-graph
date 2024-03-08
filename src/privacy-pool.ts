import {
  Deposit as DepositEvent,
  Withdrawal as WithdrawalEvent,
} from "../generated/templates/PrivacyPool/PrivacyPool";
import {
  PrivacyPool,
  Commitment,
  SubsetData,
} from "../generated/schema";
import { Bytes, ethereum } from "@graphprotocol/graph-ts";

export function handleDeposit(event: DepositEvent): void {
  let pool = PrivacyPool.load(event.address.toHex())!;
  let entity = new Commitment(
    event.transaction.hash
  );
  entity.commitment = event.params.commitment;
  entity.leaf = event.params.leaf;
  entity.asset = event.params.asset;
  entity.denomination = event.params.denomination;
  entity.leafIndex = event.params.leafIndex;
  entity.timestamp = event.block.timestamp;
  entity.pool = pool.id;
  entity.sender = event.transaction.from;
  entity.save();
}

function removeFuncSignature(event: ethereum.Event): Bytes {
  const inputDataHexString = event.transaction.input.toHexString().slice(10);
  return Bytes.fromByteArray(Bytes.fromHexString(inputDataHexString));
}

export function handleWithdrawal(event: WithdrawalEvent): void {
  const withdrawAbi = '((uint8,uint24,bytes,uint256[8],bytes32,bytes32,bytes32,address,uint256,address,uint256,uint256),address)';
  const dataWithoutFuncSignature = removeFuncSignature(event)
  
  let calldata = ethereum.decode(withdrawAbi, dataWithoutFuncSignature)!.toTuple();

  let pool = PrivacyPool.load(event.address.toHex())!;
  let entity = new SubsetData(
    event.transaction.hash
  );
  entity.recipient = event.params.recipient;
  entity.relayer = event.params.relayer;
  entity.subsetRoot = event.params.subsetRoot;
  entity.nullifier = event.params.nullifier;
  entity.fee = event.params.fee;
  entity.timestamp = event.block.timestamp;
  entity.pool = pool.id;
  entity.sender = event.transaction.from;
  entity.accessType = calldata[0].toTuple()[0].toI32();
  entity.bitLength = calldata[0].toTuple()[1].toI32();
  entity.subsetData = calldata[0].toTuple()[2].toBytes();
  entity.save();
}
