export default authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  // Ověříme, že user je vpohodě a má jwt token
  if (user && user.accessToken) {
    return {
      Authorization: 'Bearer ' + user.accessToken
    };
  } else {
    // Pokud user je špatný, auth header není
    return {};
  }
}
