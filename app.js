let moonDust = 0;
let autoModifier = 0;
let perClickModifier = 1;
let moonImg = 'https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg';
let time;

let clickUpgrades = {
  pickaxes: {
    name: 'pickaxes',
    price: 50,
    quantity: 0,
    multiplier: 1
  },
  lasers: {
    name: 'lasers',
    price: 1000,
    quantity: 0,
    multiplier: 20
  },
  excavators: {
    name: 'excavators',
    price: 10000,
    quantity: 0,
    multiplier: 200
  }
};

let automaticUpgrades = {
  locals: {
    name: 'locals',
    price: 100,
    quantity: 0,
    multiplier: 5
  },
  rovers: {
    name: 'rovers',
    price: 600,
    quantity: 0,
    multiplier: 100
  },
  moonbase: {
    name: 'moonbase',
    price: 1000000,
    quantity: 0,
    multiplier: 25000
  },
};

/**
 * passes in the upgrade name
 * purchases click upgrade if has enough money.
 * @param  {string} upgrade manually have to pass string when called
 */
function purchaseClickUpgrade(upgrade) {
  for (const key in clickUpgrades) {
    if (clickUpgrades.hasOwnProperty(key)) {
      const upg = clickUpgrades[key];
      if (upg.name == upgrade) {
        if (moonDust >= upg.price) {
          upg.quantity++;
          moonDust -= upg.price;
          perClickModifier += upg.multiplier;
          upg.price += Math.floor(upg.price * .5);
        }
      }
    }
    update()
  }
}

/**
 * passes in the upgrade name
 * purchases auto upgrade if has enough money.
 * @param  {string} upgrade manually have to pass string when called
 */
function purchaseAutoUpgrade(upgrade) {
  for (const key in automaticUpgrades) {
    if (automaticUpgrades.hasOwnProperty(key)) {
      const upg = automaticUpgrades[key];
      if (upg.name == upgrade) {
        if (moonDust >= upg.price) {
          upg.quantity++;
          moonDust -= upg.price;
          autoModifier += upg.multiplier;
          upg.price += Math.floor(upg.price * .5);
        }
      }
    }
    update()
  }
}

/**Global Timer every 1 second
 */
function setTimer() {
  time = setInterval(autoMine, 1000);
}

/**fires off every second, handles auto upgrades
 */
function autoMine() {
  for (const key in automaticUpgrades) {
    if (automaticUpgrades.hasOwnProperty(key)) {
      const upgrade = automaticUpgrades[key];
      moonDust += (upgrade.multiplier * upgrade.quantity);
    }
  }
  update();
}

/**fires off every click of moon, handles click upgrades
 */
function mine() {
  moonDust++;
  for (const key in clickUpgrades) {
    if (clickUpgrades.hasOwnProperty(key)) {
      const upgrade = clickUpgrades[key];
      moonDust += (upgrade.multiplier * upgrade.quantity);
    }
  }
  update()
}

/**draws updated changes to page
 */
function update() {
  let dust = document.getElementById('moon-dust-count');
  let dpc = document.getElementById('dpc');
  let auto = document.getElementById('auto-count');
  let pickaxeCount = document.getElementById('purchased-pickaxe');
  let laserCount = document.getElementById('purchased-laser');
  let excavatorCount = document.getElementById('purchased-excavator');
  let localsCount = document.getElementById('purchased-local');
  let roverCount = document.getElementById('purchased-rover');
  let baseCount = document.getElementById('purchased-moonbase');

  dust.innerText = moonDust.toString();
  dpc.innerText = perClickModifier.toString()
  auto.innerText = autoModifier.toString()
  pickaxeCount.innerText = clickUpgrades.pickaxes.quantity.toString();
  laserCount.innerText = clickUpgrades.lasers.quantity.toString();
  excavatorCount.innerText = clickUpgrades.excavators.quantity.toString();
  localsCount.innerText = automaticUpgrades.locals.quantity.toString();
  roverCount.innerText = automaticUpgrades.rovers.quantity.toString();
  baseCount.innerText = automaticUpgrades.moonbase.quantity.toString();
}

setTimer()
update()