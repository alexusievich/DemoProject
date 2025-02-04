import Cookie from "../../../utils/cookies/Cookie";

export function handleRecentProductsInCookies(phoneDetails) {
    if (Cookie.getCookie('phoneIds') === '') {
        let arr = [];
        arr[0] = phoneDetails.id;
        Cookie.setCookie('phoneIds', JSON.stringify(arr));
    } else {
        let arr = JSON.parse(Cookie.getCookie('phoneIds'));
        if (arr.length === 1) {
            if (arr[0] !== phoneDetails.id) {
                arr[1] = phoneDetails.id;
            }
        } else {
            if (arr[1] !== phoneDetails.id) {
                arr[0] = arr[1];
                arr[1] = phoneDetails.id;
            }
        }
        Cookie.setCookie('phoneIds', JSON.stringify(arr));
    }
}