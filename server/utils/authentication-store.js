exports.authenticate = function(email, password, res) {
  if (password === 'password') {
    return 'secret-token';
  } else {
    return false;
  }
};

exports.expire = function(res) {
};

exports.requireUser = function(req, res, next) {
  // Uncomment for step 14 - Authentication.
  // if (req.headers.auth_token === 'secret-token') {
       return next();
  // } else {
  //   res.status(403).end();
  // }
};
