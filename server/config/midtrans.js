const midtransClient = require('midtrans-client');

const snap = new midtransClient.Snap({
  isProduction: process.env.NODE_ENV === 'production',
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

module.exports = snap;
