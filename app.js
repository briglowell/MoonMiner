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

function setTimer() {
  time = setInterval(autoMine, 1000);
}

function autoMine() {
  for (const key in automaticUpgrades) {
    if (automaticUpgrades.hasOwnProperty(key)) {
      const upgrade = automaticUpgrades[key];
      moonDust += (upgrade.multiplier * upgrade.quantity);
    }
  }
  update();
}


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


  // if (moonDust >= clickUpgrades.pickaxes.price) {
  //   document.getElementById('pickaxe-btn').removeAttribute('disabled');
  // } else {
  //   document.getElementById('pickaxe-btn').setAttribute('diasabled', "");
  // }
  // if (moonDust >= clickUpgrades.pickaxes.price) {
  //   document.getElementById('laser-btn').removeAttribute('disabled');
  // } else {
  //   document.getElementById('laser-btn').setAttribute('diasabled', "");
  // }
  // if (moonDust >= clickUpgrades.pickaxes.price) {
  //   document.getElementById('excavator-btn').removeAttribute('disabled');
  // } else {
  //   document.getElementById('excavator-btn').setAttribute('diasabled', "");
  // }
  // if (moonDust >= automaticUpgrades.pickaxes.price) {
  //   document.getElementById('local-btn').removeAttribute('disabled');
  // } else {
  //   document.getElementById('local-btn').setAttribute('diasabled', "");
  // }
  // if (moonDust >= automaticUpgrades.pickaxes.price) {
  //   document.getElementById('rover-btn').removeAttribute('disabled');
  // } else {
  //   document.getElementById('rover-btn').setAttribute('diasabled', "");
  // }
  // if (moonDust >= automaticUpgrades.pickaxes.price) {
  //   document.getElementById('moonbase-btn').removeAttribute('disabled');
  // } else {
  //   document.getElementById('moonbase-btn').setAttribute('diasabled', "");
  // }

}

setTimer()
update()