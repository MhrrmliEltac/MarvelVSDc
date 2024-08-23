document.addEventListener("DOMContentLoaded", () => {
  const marvelHeroes = [
    { name: "Iron Man", img: "./img/main-qimg-6b2fbb11ab91a68e86233b.png" },
    { name: "Hulk", img: "./img/main-qimg-9f35247e1ffbbd3e161a6b.png" },
    { name: "Thor", img: "./img/main-qimg-7301aca683c1d0cbdf18e4.png" },
  ];

  const dcHeroes = [
    { name: "Superman", img: "./img/main-qimg-92b40443a7a4060ab097c4.png" },
    { name: "Wonder Woman", img: "./img/main-qimg-5cc7b7cb4caf0cd0d6f56f.png" },
    { name: "Flash", img: "./img/main-qimg-cad4190475af30326b98f3.png" },
  ];

  const heroContainers = document.querySelectorAll(".hero");
  const yourHeroContainer = document.querySelector(".your-choose");
  const enemyHeroContainer = document.querySelector(".enemy-choose");
  const marvelHeroSection = document.querySelector(".marvel-hero");
  const dcHeroSection = document.querySelector(".dc-hero");
  const fightButton = document.getElementById("fight-btn");
  const resultSection = document.getElementById("result");
  const resetButton = document.querySelector("button[onclick='resetGame()']");

  let yourHeroHealth = 100;
  let enemyHeroHealth = 100;

  heroContainers.forEach((hero) => {
    hero.addEventListener("click", () => {
      const selectedHero = hero.cloneNode(true);
      yourHeroContainer.innerHTML = "";
      yourHeroContainer.appendChild(selectedHero);

      // Rakip için rastgele bir kahraman seç
      const randomHero = [...marvelHeroes, ...dcHeroes][
        Math.floor(Math.random() * (marvelHeroes.length + dcHeroes.length))
      ];
      const enemyHero = document.createElement("img");
      enemyHero.src = randomHero.img;
      enemyHero.alt = randomHero.name;
      enemyHero.classList.add("hero");
      enemyHeroContainer.innerHTML = "";
      enemyHeroContainer.appendChild(enemyHero);

      // Kahraman seçim bölümlerini gizle ve sonuç bölümünü göster
      marvelHeroSection.style.display = "none";
      dcHeroSection.style.display = "none";
      resultSection.style.display = "block";
    });
  });

  fightButton.addEventListener("click", () => {
    const yourHeroImg = document.getElementById("your-hero-img");
    const enemyHeroImg = document.getElementById("enemy-hero-img");
    const yourHeroHealthValue = document.getElementById(
      "your-hero-health-value"
    );
    const enemyHeroHealthValue = document.getElementById(
      "enemy-hero-health-value"
    );

    if (
      yourHeroContainer.children.length > 0 &&
      enemyHeroContainer.children.length > 0
    ) {
      yourHeroImg.src = yourHeroContainer.querySelector("img").src;
      enemyHeroImg.src = enemyHeroContainer.querySelector("img").src;

      // Sağlık puanlarını ve barları ayarla
      yourHeroHealthValue.textContent = yourHeroHealth;
      enemyHeroHealthValue.textContent = enemyHeroHealth;

      document.getElementById("your-hero-health-bar").style.width = "100%";
      document.getElementById("enemy-hero-health-bar").style.width = "100%";

      // Dövüşü başlat
      startFight();
    } else {
      alert("Both heroes must be selected!");
    }
  });

  function startFight() {
    const healthBarYourHero = document.getElementById("your-hero-health-bar");
    const healthBarEnemyHero = document.getElementById("enemy-hero-health-bar");

    let interval = setInterval(() => {
      if (yourHeroHealth > 0 && enemyHeroHealth > 0) {
        // Rastgele hasar hesapla
        const yourHeroDamage = Math.floor(Math.random() * 10) + 1;
        const enemyHeroDamage = Math.floor(Math.random() * 10) + 1;

        yourHeroHealth -= enemyHeroDamage;
        enemyHeroHealth -= yourHeroDamage;

        // Sağlık değerlerini güncelle
        yourHeroHealth = Math.max(yourHeroHealth, 0);
        enemyHeroHealth = Math.max(enemyHeroHealth, 0);

        document.getElementById("your-hero-health-value").textContent =
          yourHeroHealth;
        document.getElementById("enemy-hero-health-value").textContent =
          enemyHeroHealth;

        healthBarYourHero.style.width = `${yourHeroHealth}%`;
        healthBarEnemyHero.style.width = `${enemyHeroHealth}%`;

        if (yourHeroHealth === 0 || enemyHeroHealth === 0) {
          clearInterval(interval);
          document.getElementById("result-text").textContent =
            yourHeroHealth === 0 ? "Enemy Wins!" : "You Win!";
        }
      }
    }, 1000); // Her saniyede bir dövüş simülasyonu
  }

  function resetGame() {
    document.querySelector(".your-choose").innerHTML = "";
    document.querySelector(".enemy-choose").innerHTML = "";
    document.getElementById("result").style.display = "none";
    marvelHeroSection.style.display = "block";
    dcHeroSection.style.display = "block";
    yourHeroHealth = 100;
    enemyHeroHealth = 100;
  }
  resetButton.addEventListener("click", resetGame);
});
