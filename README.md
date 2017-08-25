# Stripe PDF Invoice 2.0.0 #

## Render ##

![ScreenShot](/invoice.jpg)

## NB ##

  - Breaking changes
  - Support for async/await is needed (Node 7.6)

## Install ##
Install the [wkhtmltopdf executable](http://wkhtmltopdf.org/downloads.html)

```
    npm install stripe-pdf-invoice
```

## Usage ##

### Generate invoice in a file ####

```js
const invoice_id = 'invoice_id';
const stripe_key = 'stripe_key';

const fs = require('fs');
const path = require('path');

const stripepdfinvoice = require('./index')(stripe_key, {
  company_name: 'Trusk',
  company_address: '14 rue Charles V',
  company_zipcode: '75004',
  company_city: 'Paris',
  company_country: 'France',
  company_siret: '146-458-246',
  company_vat_number: '568-3587-345',
  company_logo: path.resolve("./batman.jpg"),
  color: '#2C75FF',
});

stripepdfinvoice(invoice_id, {
  client_company_name: 'My Company',
  client_company_address: '1 infinite Loop',
  client_company_zipcode: '95014',
  client_company_city: 'Cupertino, CA',
  client_company_country: 'USA',
  receipt_number: 'ER56T67'
})
.then(stream => {
  stream.pipe(fs.createWriteStream('./invoice.pdf'));
  stream.on('end', () => {
    console.log('done');
  });
  stream.on('error', (error) => {
    console.log(error);
  });
});
```

### Use with Express ####

```js
const invoice_id = 'invoice_id';
const stripe_key = 'stripe_key';

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const stripepdfinvoice = require('./index')(stripe_key, {
  company_name: 'Trusk',
  company_address: '14 rue Charles V',
  company_zipcode: '75004',
  company_city: 'Paris',
  company_country: 'France',
  company_siret: '146-458-246',
  company_vat_number: '568-3587-345',
  company_logo: path.resolve("./batman.jpg"),
  color: '#2C75FF',
});

app.get('/', function(req, res) {
  res.set('content-type', 'application/pdf; charset=utf-8');
  stripepdfinvoice(invoice_id, {
    client_company_name: 'My Company',
    client_company_address: '1 infinite Loop',
    client_company_zipcode: '95014',
    client_company_city: 'Cupertino, CA',
    client_company_country: 'USA',
    receipt_number: 'ER56T67'
  })
  .then(stream => {
    //Force download
    //res.set('Content-Disposition', 'attachment; filename=invoice.pdf');
    stream.pipe(res);
  });
});

app.listen(3000);
```

### Options ####

```
number (Number)
currency_position_before (Bool)
currency_symbol (String)
date_format (String)
due_days (Number)
color (Number)

company_name (String)
company_logo (String)
company_address (String)
company_zipcode (String)
company_city (String)
company_country (String)
company_siret (String)
company_vat_number (String)

client_company_name (String)
client_company_address (String)
client_company_zipcode (String)
client_company_city (String)
client_company_country (String)

label_invoice (String)
label_invoice_to (String)
label_invoice_by (String)
label_due_on (String)
label_invoice_for (String)
label_description (String)
label_unit (String)
label_price (String)
label_amount (String)
label_subtotal (String)
label_total (String)
label_vat (String)
label_invoice_by (String)
label_invoice_date (String)
label_company_siret (String)
label_company_vat_number (String)
label_invoice_number (String)
label_reference_number (String)
label_invoice_due_date (String)
```
