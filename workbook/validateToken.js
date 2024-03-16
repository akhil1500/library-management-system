const jwt = require('jsonwebtoken');

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWtoaWwiLCJhZ2UiOiIyOCIsImlhdCI6MTcxMDU2OTQ4NX0.hizAmWwZ5pOrG-7pR41v9MddahZQyZB9PkwkXC3_uM96U7SeJEivxPP5zsw_Hq7O0QLph1jUMGSUuNAvY8SeLTwQLN_xPYzmtgByrOzWCqLHFRKp9KQTGo0f-pSoEH6icwAPJzSNxfHtbo9HlKSk1rFzbaGlQohA3kG4PeIvgb3a52HZfw6Xfg_5chX6mPTJ6VqoRIkQA0mYBzrT4__Ma7lSaB_FQcnurtlTSU8PalMACSM4srk_JOTxF6lhDm4Mtp82kga6-e_dzyG1OH04uDWVns4rZsuigamfpLEGLFf2M53WH8HBWi4xvcI9TAXfle2ZrUIaGaBh79hJ-oaok_WPpMlAjmMoIZKdHZSmM1ereA-cfgm3P0WXIc8mPjyA9BcVVE34Ep6C8z-fp3y7Dm5IubZdrmyQeGBuCzTFLFNAd158YCX6ZmUqDs0JI_bZAwCKtLwMsF85c4TO_6WMNLRu000bwCrhm39mm3T4RxG6YKy47QCHyK9tx9SZHAV-8hC1Aq5JHlYEAgQx8vVtceiQvCK2nLn4yUEhfn7OLXujisxVIEsxZSRBkIg64SD12wSa47ylKCnyou8toZFvfhKxXy0vM1GUpNcUkk_bXpCVRWbmEllZyUsno4dA8z0nkckiNuihqcl-pVhIRkZHaP7LyFfO6Pw2dHQkhrwoNBM'; // JWT token from the client

const {publicKey} = require("../config/index");

jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
  if (err) {
    // Token verification failed
    console.error('JWT Verification Failed:', err.message);
  } else {
    // Token verification successful
    console.log('Decoded JWT:', decoded);
  }
});
