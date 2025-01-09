import Stripe from "stripe";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const product = req.body;

      const lineItems = product?.flatMap((cartProduct) =>
        cartProduct.products.map((item) => ({
          price_data: {
            currency: "inr",
            product_data: {
              name: item.name,
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        }))
      );

      const stripe = new Stripe("sk_test_51QbzA3H4xuw4fMr9l682sZaJTEMniYMz6kxq2EDGL258blnR4FLiUD11tKaMaDzisSYFOblPwMVJyPUHhyvCzW8X00yvEImhST");

      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/cancel",
      });

      res.status(200).json({ id: session?.id });
    } catch (error) {
      console.error("Stripe error:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
  }
}
