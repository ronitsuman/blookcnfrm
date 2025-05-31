// src/integrations/google-maps/google-maps.config.js
import { Client } from '@googlemaps/google-maps-services-js';

const googleMapsClient = new Client({});

export const geocodeAddress = async (address) => {
  if (!address) throw new Error('Address is required');
  try {
    const response = await googleMapsClient.geocode({
      params: {
        address,
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    });
    const location = response.data.results[0]?.geometry.location;
    if (!location) throw new Error('No location found for the address');
    return location;
  } catch (error) {
    throw new Error(`Geocoding failed: ${error.message}`);
  }
};

export default googleMapsClient;
