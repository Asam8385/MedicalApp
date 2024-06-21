import {authKey} from '../constant/storageKey';
import {decodeToken} from '../utils/jwt';
import { getFromLocalStorage, setLocalStorage } from '../utils/local-storage';
export const setUserInfo = ({ accessToken }) => {
    return setLocalStorage(authKey, accessToken);
}

export const getUserInfo =  () => {
    const authToken = getFromLocalStorage(authKey);
    if (authToken) {
        const decodedToken = decodeToken(authToken);
        console.log("decoded token" + decodedToken)
        return decodedToken
    } else {
        return null
    }
}
export const isLoggedIn = () => {
    const authToken = getFromLocalStorage(authKey);
    return !!authToken;
}
export const loggedOut = () => {
    return localStorage.removeItem(authKey)
}