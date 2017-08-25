const Stripe = require('stripe');
const pug = require('pug');
const wkhtmltopdf = require('wkhtmltopdf');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const sizeOf = require('image-size');

const template = require(`./templates/default`);

module.exports = (key, config = {}) => async (invoiceId, data = {}) => {
  const stripe = new Stripe(key);
  if(!invoiceId) {
    throw new Error('missing_invoice_id');
  }
  const invoice = await stripe.invoices.retrieve(invoiceId);
  const tpld = template(Object.assign({
    currency_symbol: '$',
    label_invoice: 'invoice',
    label_invoice_to: 'invoice to',
    label_invoice_by: 'invoice by',
    label_due_on: 'Due on',
    label_invoice_for: 'invoice for',
    label_description: 'description',
    label_unit: 'unit',
    label_price: 'price ($)',
    label_amount: 'Amount',
    label_subtotal: 'subtotal',
    label_total: 'total',
    label_vat: 'vat',
    label_invoice_by: 'invoice by',
    label_invoice_date: 'invoice date',
    label_company_siret: 'Company SIRET',
    label_company_vat_number: 'Company VAT N°',
    label_invoice_number: 'invoice number',
    label_reference_number: 'ref N°',
    label_invoice_due_date: 'Due date',
    company_name: 'My company',
    date_format: 'MMMM Do, YYYY',
    client_company_name: 'Client Company',
    number: '12345',
    currency_position_before: true,
    language: 'en',
  }, invoice, config, data));
  return wkhtmltopdf(pug.compileFile(tpld.body)(Object.assign(tpld.data, {
    moment,
    path,
    fs,
    sizeOf
  })), { pageSize: 'letter' });
}
