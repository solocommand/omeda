const AddressContactType = require('./address-contact-type');
const ContactTypeStatusCode = require('./contact-type-status-code');
const DemographicType = require('./demographic-type');
const DemographicValueType = require('./demographic-value-type');
const EmailContactType = require('./email-contact-type');
const PhoneContactType = require('./phone-contact-type');
const WebformViewCode = require('./webform-view-code');

const customer = require('./customer');
const subscriptions = require('./subscriptions');

module.exports = {
  AddressContactType,
  ContactTypeStatusCode,
  DemographicType,
  DemographicValueType,
  EmailContactType,
  PhoneContactType,
  WebformViewCode,
  ...customer,
  ...subscriptions,
};
