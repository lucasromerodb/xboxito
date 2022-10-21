const devMode = false;

const dollarMock = {
  data: {
    compra: "103,46",
    venta: "109,46",
    fecha: "17/01/2022 - 17:49",
    variacion: "0,23%",
    "class-variacion": "up",
  },
};

const allTaxes = {
  ganancias: 0.35,
  pais: 0.4,
  qatar: 0.25,
};

const tax = allTaxes.ganancias + allTaxes.pais;

let dollar;

const hostname = window.location.hostname;
const pathname = window.location.pathname;

// Get USD exchange rate
if (["playstation.com", "epicgames.com", "psdeals.net"].some((w) => hostname.includes(w))) {
  if (devMode) {
    console.warn("--- RUNNING IN DEV MODE ---");
    dollar = dollarMock;
  } else {
    chrome.runtime.sendMessage("GET_DOLLAR_OFFICIAL", (response) => {
      dollar = response;
    });
  }
}

// Assign the correct method to handle the mutations based on website and region
function handleMutationsInit() {
  setTimeout(() => {
    handlePlaystationMutations();
    handleEpicMutations();
    handleXBDealsMutations();
    handlePSDealsMutations();
    handleXboxMutations();
    handleNintendoARMutations();
  }, 1000);
}

// Watch HTML mutations
const observer = new MutationObserver(handleMutationsInit);
const observerOptions = { subtree: true, attributes: true };

observer.observe(document, observerOptions);
