//  FORM VERİ GÖNDERME (form.html'den)
if (window.location.pathname.includes("form.html")) {
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("legendForm");
    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const legend = document.getElementById("legend").value;
      const comment = document.getElementById("comment").value;

      const params = new URLSearchParams({ name, email, phone, legend, comment });
      window.location.href = `sonuc.html?${params.toString()}`;
    });
  });
}

// FORM VERİ GÖSTERME (sonuc.html'de)
if (window.location.pathname.includes("sonuc.html")) {
  document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    document.getElementById("name").textContent = params.get("name");
    document.getElementById("email").textContent = params.get("email");
    document.getElementById("phone").textContent = params.get("phone");
    document.getElementById("legend").textContent = params.get("legend");
    document.getElementById("comment").textContent = params.get("comment");
  });
}

//  QUIZ OYUNU (oyun.html'de)
if (window.location.pathname.includes("oyun.html")) {
  document.addEventListener("DOMContentLoaded", function () {
    const sorular = [
      {
        soru: "2004-2012 arasında Fenerbahçe'de oynayan Brezilyalı 10 numara kimdir?",
        secenekler: ["Tuncay", "Alex", "Roberto Carlos"],
        cevap: "Alex",
      },
      {
        soru: "Fenerbahçe'nin efsane kalecisi kimdir?",
        secenekler: ["Volkan Demirel", "Serhat Akın", "Lugano"],
        cevap: "Volkan Demirel",
      },
      {
        soru: "Fenerbahçe'de hem futbol hem basketbol oynamış efsane kimdir?",
        secenekler: ["Can Bartu", "Emre Belözoğlu", "Selçuk Yula"],
        cevap: "Can Bartu",
      },
    ];

    let soruIndex = 0;
    let sure = 10;
    let zamanlayici;

    function soruyuYukle() {
      const soru = sorular[soruIndex];
      const soruEl = document.getElementById("soruMetni");
      const sureEl = document.getElementById("sure");
      const seceneklerDiv = document.getElementById("secenekler");
      const sonucEl = document.getElementById("sonuc");

      if (!soruEl || !sureEl || !seceneklerDiv || !sonucEl) return;

      soruEl.textContent = soru.soru;
      sonucEl.textContent = "";
      sure = 10;
      sureEl.textContent = "Süre: " + sure;

      seceneklerDiv.innerHTML = "";
      soru.secenekler.forEach((secenek) => {
        const btn = document.createElement("button");
        btn.textContent = secenek;
        btn.onclick = () => cevapKontrol(secenek);
        seceneklerDiv.appendChild(btn);
      });

      zamanlayici = setInterval(() => {
        sure--;
        sureEl.textContent = "Süre: " + sure;
        if (sure === 0) {
          clearInterval(zamanlayici);
          cevapKontrol(null);
        }
      }, 1000);
    }

    function cevapKontrol(secim) {
      clearInterval(zamanlayici);
      const dogru = sorular[soruIndex].cevap;
      const sonucEl = document.getElementById("sonuc");

      if (secim === dogru) {
        sonucEl.textContent = "Doğru bildin! 💛💙";
      } else {
        sonucEl.textContent = `Yanlış ya da süre bitti  Doğru cevap: ${dogru}`;
      }

      setTimeout(() => {
        soruIndex++;
        if (soruIndex < sorular.length) {
          soruyuYukle();
        } else {
          document.getElementById("soruMetni").textContent = "Oyun bitti!";
          document.getElementById("secenekler").innerHTML = "";
          document.getElementById("sure").style.display = "none";
        }
      }, 3000);
    }

    soruyuYukle();
  });
}
