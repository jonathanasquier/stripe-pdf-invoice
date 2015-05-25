# Stripe PDF Invoice #

## Render ##

![ScreenShot](/invoice.jpg)

## Usage ##

### Generate invoice in a file ####

```````
var fs = require('fs');
var pdfInvoice = require('stripe-pdf-invoice')('STRIPE_KEY', {/*options...*/});
var invoiceId = 'STRIPE_INVOICE_ID';

pdfInvoice.generate(invoiceId, {/*options...*/}, function(error, pdfname, stream){
    stream.pipe(fs.createWriteStream(pdfname));
});
```````

### Use with Express ####

```````
var express = require('express');
var app = express();
var pdfInvoice = require('stripe-pdf-invoice')('STRIPE_KEY', {/*options...*/});
var invoiceId = 'STRIPE_INVOICE_ID';

app.get('/', function(req, res) {
    res.set('content-type', 'application/pdf; charset=utf-8');
    pdfInvoice.generate(invoiceId, {/*options...*/}, function(error, pdfname, stream){
        //Force download
        //res.set('Content-Disposition', 'attachment; filename=' + pdfname + '.pdf');
        stream.pipe(res);
    });
});
```````

### Options ####

```````
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

```````

## TODO ##

    Remote logo and logo type test (mmmagic)
