module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '6a1853ed2d7e49c5b91e431354bf56ff'),
  },
});
