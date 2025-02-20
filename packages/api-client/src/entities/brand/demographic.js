const { asArray } = require('@parameter1/utils');
const build = require('../../schema/utils/build');
const schema = require('../../schema/brand/demographic-elements');

const DemographicValue = require('./demographic-value');

const builder = ({ name, value }) => {
  if (name === 'DemographicValues') {
    return asArray(value).map((obj) => new DemographicValue(obj));
  }
  return null;
};

class BrandDemographicEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj, builder }));
  }
}

module.exports = BrandDemographicEntity;
