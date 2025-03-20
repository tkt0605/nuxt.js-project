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
// import CryptoJS from "crypto-js";

// // 🔒 AES 暗号化
// export const encryptData = (data, secretKey) => {
//   try {
//     const jsonData = typeof data === "string" ? data : JSON.stringify(data);
//     const encrypted = CryptoJS.AES.encrypt(jsonData, secretKey).toString();
//     console.log("🔒 暗号化データ:", encrypted);
//     return encrypted;
//   } catch (error) {
//     console.error("🔒 暗号化エラー:", error);
//     return null;
//   }
// };

// // 🔓 AES 復号
// export const decryptData = (ciphertext, secretKey) => {
//   try {
//     if (!ciphertext || !secretKey) {
//       console.warn("🛑 復号データまたは秘密鍵が不足しています。");
//       return "復号失敗";
//     }

//     console.log("🔑 復号用キー:", secretKey);
//     console.log("🔐 復号前の暗号化データ:", ciphertext);

//     const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
//     const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

//     if (!decryptedText) {
//       console.error("🛑 復号化されたデータが空です。");
//       return "復号失敗";
//     }

//     try {
//       return JSON.parse(decryptedText);
//     } catch {
//       return decryptedText;
//     }
//   } catch (error) {
//     console.error("🛑 復号エラー:", error);
//     return "復号失敗";
//   }
// };

// // 秘密鍵を生成する関数
// export const generateSecretKey = () => {
//   return CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Base64);
// };
