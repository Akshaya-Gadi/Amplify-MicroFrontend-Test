// Ambient declarations for federated remote modules so TypeScript is happy.
// The actual code is fetched at runtime from each remote's remoteEntry.js.
declare module 'billing/BillingApp' {
  import type { ComponentType } from 'react';
  const BillingApp: ComponentType;
  export default BillingApp;
}

declare module 'claims/ClaimsApp' {
  import type { ComponentType } from 'react';
  const ClaimsApp: ComponentType;
  export default ClaimsApp;
}
