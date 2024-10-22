
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZzaX6tkgG8M5pf_CR5wLpniDRKCPGnhs",
  authDomain: "qrquiz-5f858.firebaseapp.com",
  databaseURL: "https://qrquiz-5f858-default-rtdb.firebaseio.com",
  projectId: "qrquiz-5f858",
  storageBucket: "qrquiz-5f858.appspot.com",
  messagingSenderId: "1071326834605",
  appId: "1:1071326834605:web:23ce29cbbf0d49a3683b24",
  measurementId: "G-P1TEL7XXG0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);