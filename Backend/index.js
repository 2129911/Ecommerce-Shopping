import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';

const app = express();


const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));  

app.use(express.json());

app.post("/api/makepayment", async (req, res) => {
  const product = req?.body;
  console.log("product", product);

  const lineItems = product?.flatMap(cartProduct =>
    cartProduct.products.map(item => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Price in cents
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
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
