function SetCookie(name, value) {
   document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
}

export default SetCookie
