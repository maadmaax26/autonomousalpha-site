import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export default stripe

// Product IDs from Stripe Dashboard
export const PRODUCTS = {
  rammstein: process.env.STRIPE_PRICE_RAMMSTEIN,
  mesmaster: process.env.STRIPE_PRICE_MESMASTER,
  bundle: process.env.STRIPE_PRICE_BUNDLE,
}
