import express from "express";
import crypto from "crypto";

const app = express();

const PAYU_KEY = "G0Ddxo";
const PAYU_SALT = "ARUo9bWH25TlOV3OdcvkKBspX3wqIrc5";
const PAYU_BASE_URL = "https://test.payu.in/_payment";

app.get("/pay", (req, res) => {
  const txnid = "TXN" + Date.now();
  const amount = "100.00";
  const productinfo = "UPI Only Payment";
  const firstname = "Karan";
  const email = "test@test.com";
  const phone = "9999999999";

  const surl = "https://upi-backend-orxf.onrender.com/success";
  const furl = "https://upi-backend-orxf.onrender.com/failure";

  const hashString = `${PAYU_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${PAYU_SALT}`;

  const hash = crypto.createHash("sha512").update(hashString).digest("hex");

  res.send(`
    <html>
      <body onload="document.forms[0].submit()">
        <form action="${PAYU_BASE_URL}" method="post">
          <input type="hidden" name="key" value="${PAYU_KEY}" />
          <input type="hidden" name="txnid" value="${txnid}" />
          <input type="hidden" name="amount" value="${amount}" />
          <input type="hidden" name="productinfo" value="${productinfo}" />
          <input type="hidden" name="firstname" value="${firstname}" />
          <input type="hidden" name="email" value="${email}" />
          <input type="hidden" name="phone" value="${phone}" />
          <input type="hidden" name="surl" value="${surl}" />
          <input type="hidden" name="furl" value="${furl}" />

          <!-- FORCE UPI ONLY -->
          <input type="hidden" name="pg" value="UPI" />
          <input type="hidden" name="bankcode" value="UPI" />

          <input type="hidden" name="hash" value="${hash}" />
        </form>
      </body>
    </html>
  `);
});

app.post("/success", (req, res) => {
  res.send("Payment Success");
});

app.post("/failure", (req, res) => {
  res.send("Payment Failed");
});

app.listen(5000, () => {
  console.log("UPI-only PayU server running");
});
