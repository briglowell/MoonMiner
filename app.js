let moonDust = 0;
let autoModifier = 0;
let perClickModifier = 1;
let moonImg = 'https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg';
let time;

let clickUpgrades = {
  pickaxes: {
    price: 50,
    quantity: 0,
    multiplier: 1
  },
  lasers: {
    price: 1000,
    quantity: 0,
    multiplier: 20
  },
  excavators: {
    price: 10000,
    quantity: 0,
    multiplier: 200
  }
};

let automaticUpgrades = {
  locals: {
    price: 100,
    quantity: 0,
    multiplier: 1
  },
  rovers: {
    price: 600,
    quantity: 0,
    multiplier: 20
  },
};

function buyPickaxe() {
  let pickaxe = clickUpgrades.pickaxes;
  if (moonDust >= pickaxe.price) {
    pickaxe.quantity++;
    moonDust -= pickaxe.price;
    perClickModifier += pickaxe.multiplier;
    pickaxe.price += Math.floor(pickaxe.price * .5);
  }
  update()
}

function buyLaser() {
  let laser = clickUpgrades.lasers;
  if (moonDust >= laser.price) {
    laser.quantity++;
    moonDust -= laser.price;
    perClickModifier += laser.multiplier;
    laser.price += Math.floor(laser.price * .5);
  }
  update()
}

function buyExcavator() {
  let excavator = clickUpgrades.excavators;
  if (moonDust >= excavator.price) {
    excavator.quantity++;
    moonDust -= excavator.price;
    perClickModifier += excavator.multiplier;
    excavator.price += Math.floor(excavator.price * .5);
  }
  update()
}

function hireLocal() {
  let local = automaticUpgrades.locals;
  if (moonDust >= local.price) {
    local.quantity++;
    moonDust -= local.price;
    autoModifier += local.multiplier;
    local.price += Math.floor(local.price * .5);
  }
  update()
}

function hireRover() {
  let rover = automaticUpgrades.rovers;
  if (moonDust >= rover.price) {
    rover.quantity++;
    moonDust -= rover.price;
    autoModifier += rover.multiplier;
    rover.price += Math.floor(rover.price * .5);
  }
  update()
}

// function purchaseAutoUpgrade(upgrade) {
//   let upg = automaticUpgrades.upgrade;
//   if (moonDust >= upg.price) {
//     upg.quantity++;
//     moonDust -= upg.price;
//     autoModifier += upg.multiplier;
//     upg.price += Math.floor(upg.price * .5);
//   }
//   update()
// }

// function purchaseClickUpgrade(upgrade) {
//   let upg = clickUpgrades.upgrade;
//   if (moonDust >= upg.price) {
//     upg.quantity++;
//     moonDust -= upg.price;
//     perClickModifier += upg.multiplier;
//     upg.price += Math.floor(upg.price * .5);
//   }
//   update()
// }

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
  console.log(moonDust)
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

  dust.innerText = moonDust.toString();
  dpc.innerText = perClickModifier.toString()
  auto.innerText = autoModifier.toString()
  pickaxeCount.innerText = clickUpgrades.pickaxes.quantity.toString();
  laserCount.innerText = clickUpgrades.lasers.quantity.toString();
  excavatorCount.innerText = clickUpgrades.excavators.quantity.toString();
  localsCount.innerText = automaticUpgrades.locals.quantity.toString();
  roverCount.innerText = automaticUpgrades.rovers.quantity.toString();

}

setTimer()
update()