const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

function createStrategy() {
  passport.use('linkedin', new LinkedInStrategy({
    clientID: proces.env.LINKEDIN_KEY,
    clientSecret: proces.env.LINKEDIN_SECRET,
    callbackURL: proces.env.LINKEDIN_CALLBACK,
    scope: ['r_emailaddress', 'r_liteprofile'],
  }, function (accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    return done(null, profile);
  }));
}

module.exports = {
  createStrategy
}
