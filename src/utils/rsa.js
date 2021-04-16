import {JSEncrypt} from 'jsencrypt'

export function RSAJSEncrypt(key, data){
    var crypt = new JSEncrypt();
    crypt.setPrivateKey(key);
    return crypt.encrypt(data);
}
