exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get('Cookie').split(';')[1].trim().split('=')[1];
  // console.log(isLoggedIn);
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Longin',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader('Set-Cookie', 'loggedIn=true;HttpOnly;');
  res.redirect('/');
};