module.exports = ({ config }) => {
  return {
    ...config,
    android: {
      ...config.android,
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_API_KEY,
        },
      },
    },
  };
};
