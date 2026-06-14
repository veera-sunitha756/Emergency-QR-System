import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

/* 🔥 Firebase Config */
const firebaseConfig = {
  apiKey: "AIzaSyB7E7Rn46k1nC6MFcMJZ6aLWxZMQXZD-bc",
  authDomain: "emergency-qr-950e5.firebaseapp.com",
  projectId: "emergency-qr-950e5",
  storageBucket: "emergency-qr-950e5.firebasestorage.app",
  messagingSenderId: "670165302728",
  appId: "1:670165302728:web:b5ceb69c82ea8c0f9d94fd"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* 💾 SAVE + QR GENERATE */
window.saveData = async function () {

  try {

    const name = document.getElementById("name").value;
    const blood = document.getElementById("blood").value;

    const contact1 = document.getElementById("contact1").value;
    const contact2 = document.getElementById("contact2").value;

    const address = document.getElementById("address").value;

    const docRef = await addDoc(collection(db, "users"), {
      name,
      blood,
      contact1,
      contact2,
      address,
      time: new Date()
    });

    const id = docRef.id;

    /* 🌐 GitHub Pages Full URL */
    const link =
      `https://veera-sunitha756.github.io/location-project/profile.html?id=${id}`;

    const canvas = document.getElementById("qr");

    QRCode.toCanvas(canvas, link, function (error) {

      if (error) {
        console.error(error);
        alert("QR generation failed ❌");
      } else {
        console.log("QR generated successfully ✅");
        alert("Saved + QR Generated 🚑");
      }

    });

  } catch (err) {
    console.log(err);
    alert("Error: " + err);
  }

};