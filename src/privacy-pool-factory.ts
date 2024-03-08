import { PrivacyPoolCreated } from "../generated/PrivacyPoolFactory/PrivacyPoolFactory";
import { PrivacyPool as PrivacyPoolTemplate } from "../generated/templates";
import { PrivacyPool } from "../generated/schema";

export function handlePrivacyPoolCreated(event: PrivacyPoolCreated): void {
  let pool = new PrivacyPool(event.params.privacyPool.toHex()) as PrivacyPool;
  pool.asset = event.params.asset;
  pool.denomination = event.params.denomination;
  pool.save();
  PrivacyPoolTemplate.create(event.params.privacyPool);
}
