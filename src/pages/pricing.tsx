import { PricingView } from 'src/sections/pricing/view'

import CompactLayout from '../layouts/compact/CompactLayout'

export const metadata = { title: `Pricing - ` }

Pricing.getLayout = (page: React.ReactElement) => (
  <CompactLayout sx={{ maxWidth: 'none' }}>{page}</CompactLayout>
)

export default function Pricing() {
  return <PricingView />
}
