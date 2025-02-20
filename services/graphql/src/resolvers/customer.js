module.exports = {
  /**
   *
   */
  Customer: {
    /**
     *
     */
    async demographics({ Id }, _, { apiClient }) {
      const response = await apiClient.resource('customer').lookupDemographics({
        customerId: Id,
        errorOnNotFound: false,
      });
      return response.data;
    },

    /**
     *
     */
    async emailAddresses({ Id }, _, { apiClient }) {
      const response = await apiClient.resource('customer').lookupEmails({
        customerId: Id,
        errorOnNotFound: false,
      });
      return response.data;
    },

    /**
     *
     */
    async externalIds({ Id }, _, { apiClient }) {
      const response = await apiClient.resource('customer').lookupExternalIds({
        customerId: Id,
        errorOnNotFound: false,
      });
      return response.data;
    },

    /**
     *
     */
    async phoneNumbers({ Id }, _, { apiClient }) {
      const response = await apiClient.resource('customer').lookupPhoneNumbers({
        customerId: Id,
        errorOnNotFound: false,
      });
      return response.data;
    },

    /**
     *
     */
    async postalAddresses({ Id }, _, { apiClient }) {
      const response = await apiClient.resource('customer').lookupPostalAddresses({
        customerId: Id,
        errorOnNotFound: false,
      });
      return response.data;
    },
  },

  /**
   *
   */
  CustomerDemographic: {
    /**
     *
     */
    demographic({ DemographicId }, _, { repos }) {
      return repos.brandDemographic.findById({ id: DemographicId });
    },

    /**
     *
     */
    value({ DemographicId, ValueId }, _, { repos }) {
      if (!DemographicId || !ValueId) return null;
      return repos.brandDemographic.findValueById({
        demographicId: DemographicId,
        valueId: ValueId,
      });
    },
  },

  /**
   *
   */
  RapidCustomerIdentification: {
    /**
     *
     */
    async customer({ CustomerId }, _, { apiClient }) {
      const response = await apiClient.resource('customer').lookupById({
        customerId: CustomerId,
      });
      return response.data;
    },
  },

  /**
   *
   */
  Mutation: {
    /**
     *
     */
    async rapidCustomerIdentification(_, { input }, { apiClient }) {
      const {
        firstName,
        lastName,
        title,
        companyName,
        regionCode,
        countryCode,
        postalCode,
      } = input;

      const hasAddress = companyName || regionCode || countryCode || postalCode;
      const body = {
        RunProcessor: 1,
        Products: [{ OmedaProductId: input.productId }],
        Emails: [{ EmailAddress: input.email }],
        ...(firstName && { FirstName: firstName }),
        ...(lastName && { LastName: lastName }),
        ...(title && { Title: title }),
        ...(hasAddress && {
          Addresses: [
            {
              ...(companyName && { Company: companyName }),
              ...(regionCode && { RegionCode: regionCode }),
              ...(countryCode && { CountryCode: countryCode }),
              ...(postalCode && { PostalCode: postalCode }),
            },
          ],
        }),
      };
      const response = await apiClient.resource('customer').storeCustomerAndOrder({
        body,
        inputId: input.inputId,
      });
      return response.data;
    },
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    async customerById(_, { input }, { apiClient }) {
      const { id, reQueryOnInactive } = input;
      const response = await apiClient.resource('customer').lookupById({
        customerId: id,
        reQueryOnInactive,
      });
      return response.data;
    },

    /**
     *
     */
    async customerByEncyptedId(_, { input }, { apiClient }) {
      const { id } = input;
      const response = await apiClient.resource('customer').lookupByEncryptedId({
        encryptedId: id,
      });
      return response.data;
    },
  },
};
