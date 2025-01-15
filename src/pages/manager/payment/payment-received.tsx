import CompactLayout from '@root/src/layouts/compact'
import { PaymentReceived } from '@root/src/sections/pricing/payment-received'

export const metadata = { title: `Pricing - ` }

Pricing.getLayout = (page: React.ReactElement) => (
  <CompactLayout sx={{ maxWidth: 'none' }}>{page}</CompactLayout>
)

export default function Pricing() {
  return <PaymentReceived />
}
