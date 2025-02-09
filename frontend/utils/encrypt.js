import CryptoJS from "crypto-js";

// 🔒 AES 暗号化
export const encryptData = (data, secretKey) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

// 🔓 AES 復号
export const decryptData = (ciphertext, secretKey) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error("復号化エラー:", error);
    return null;
  }
};

// 秘密鍵を生成する関数
export const generateSecretKey = () => {
  return CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Hex);
};
