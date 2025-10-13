// https://www.google.com/maps/dir/?api=1&origin=ORIGIN&destination=DESTINATION

interface GoogleMapsUrlNavigationParams {
  destination: string;
  origin?: string;
}

export const generateGoogleMapsNavigationUrl = (params: GoogleMapsUrlNavigationParams) => {
  const searchParams = new URLSearchParams(params.origin ? { ...params } : { destination: params.destination });
  const query = searchParams.toString();

  return `https://www.google.com/maps/dir/?api=1&${query}`;
};
