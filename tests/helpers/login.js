export function login(){
  window.localStorage.setItem('token', 'secret-token');
}
export function logout() {
  window.localStorage.setItem('token', '');
}
