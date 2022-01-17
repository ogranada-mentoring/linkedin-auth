const { Router } = require("express");
const axios = require('axios');

function makeRouter() {
  const router = new Router();

  const {
    LINKEDIN_KEY,
    LINKEDIN_SECRET,
    LINKEDIN_CALLBACK
  } = process.env;

  router.get('/auth/linkedin/callback', (req, res) => {
    if (req.query.code) {
      //  https://docs.microsoft.com/es-es/linkedin/shared/authentication/authorization-code-flow?context=linkedin%2Fcontext&tabs=HTTPS
      const args=`grant_type=authorization_code&code=${req.query.code}&client_id=${LINKEDIN_KEY}&client_secret=${LINKEDIN_SECRET}&redirect_uri=${LINKEDIN_CALLBACK}`
      return axios.post(`https://www.linkedin.com/oauth/v2/accessToken?${args}`).then(result => {
        console.log(result.data)
        // res.json(result.data)


        axios.get('https://api.linkedin.com/v2/me', {
          headers: {
            Authorization: `Bearer ${result.data.access_token}`
          }
        }).then(response => res.json(response.data))

      }).catch(error => console.log(error))
    }
    return res.status(401).json({
      message: 'Authentication failed'
    })
  });

  router.get('/auth/linkedin', (req, res) => {

    const qargs = `response_type=code&client_id=78n7g5c7zn0ols&redirect_uri=${LINKEDIN_CALLBACK}&state=aksjdlajsd&scope=r_liteprofile%20r_emailaddress`;
    res.redirect(`https://www.linkedin.com/oauth/v2/authorization?${qargs}`)
  });

  return router;
}

module.exports = {
  makeRouter
}
