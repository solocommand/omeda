const AbstractResource = require('./abstract');
const BrandComprehensiveResponse = require('../response/brand/comp');

class BrandResource extends AbstractResource {
  /**
   * This API provides capabilities to retrieve information about a single brand, including
   * its defined products, demographics, deployment types, and other cross referencing information.
   * This service is useful for building your own data mapping service when reading or writing
   * from/to other Omeda services. Results from this API should be cached and then refreshed at an
   * interval by the user. This API is not intended to be hit real time by web traffic or otherwise
   * hit with a great frequency.
   *
   * @link https://main.omeda.com/knowledge-base/brand-comprehensive-lookup/
   * @returns {Promise<BrandComprehensiveResponse>} A Set of the found customer IDs.
   */
  async comprehensiveLookup() {
    const endpoint = 'comp/*';
    const response = await this.client.get({ endpoint });
    return new BrandComprehensiveResponse({ response, resource: this });
  }
}

module.exports = BrandResource;
