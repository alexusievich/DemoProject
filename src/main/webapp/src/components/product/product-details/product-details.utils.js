import {getCookie, setCookie} from "../../../utils/cookies.utils";

export function handleRecentProductsInCookies(phoneDetails) {
    if (getCookie('phoneIds') === '') {
        let arr = [];
        arr[0] = phoneDetails.id;
        setCookie('phoneIds', JSON.stringify(arr));
    } else {
        let arr = JSON.parse(getCookie('phoneIds'));
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
        setCookie('phoneIds', JSON.stringify(arr));
    }
}