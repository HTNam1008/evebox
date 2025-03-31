export default () => ({
    port: parseInt(process.env.PORT || '8000', 10),
    jwt: {
      secret: process.env.JWT_SECRET || '1h',
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    },
    services: {
      auth: process.env.AUTH_SERVICE_URL,
    //   events: process.env.EVENT_SERVICE_URL,
    //   bookings: process.env.BOOKING_SERVICE_URL,
    //   notifications: process.env.NOTIFICATION_SERVICE_URL,
    },
    http: {
      timeout: 5000,
      maxRedirects: 3,
    },
  });