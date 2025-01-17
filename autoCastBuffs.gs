/**
 * Jakadak Auto Buy Enchanted armorie edit
 * Oroginal Auto Cast Buffs v1.0.10 by @bumbleshoot
 * 
 * See GitHub page for info & setup instructions:
 * https://github.com/bumbleshoot/auto-cast-buffs
 */

 const USER_ID = "";
 const API_TOKEN = "";
 const RESERVE_GOLD = 0;
 const API_CALLS_LEFT = 15;
 
/*************************************\
 *  DO NOT EDIT ANYTHING BELOW HERE  *
\*************************************/ 
 
const PARAMS = {
  "headers": {
    "x-api-user": USER_ID, 
    "x-api-key": API_TOKEN,
    "x-client": "35c3fb6f-fb98-4bc3-b57a-ac01137d0847-Autobuyenchantedarmorie"
  },
  "muteHttpExceptions": true
};
const GET_PARAMS = Object.assign({ "method": "get" }, PARAMS);
const POST_PARAMS = Object.assign({ "method": "post" }, PARAMS);

const scriptProperties = PropertiesService.getScriptProperties();
 
function install() {

  // if settings are valid
  if (validateConstants()) {

    // delete triggers
    deleteTriggers()

    // create trigger
    console.log("Creating trigger...")

    ScriptApp.newTrigger("buyenchantedarmorie")
      .timeBased()
      .everyMinutes(15)
      .create();
  }

  console.log("Done!")
}
 
function uninstall() {

  // delete triggers
  deleteTriggers()

  console.log("Done!")
}

function deleteTriggers() {

  console.log("Deleting triggers...")

  for (let trigger of ScriptApp.getProjectTriggers()) {
    ScriptApp.deleteTrigger(trigger);
  }
}

function validateConstants() {

  let valid = true;

  if (typeof USER_ID !== "string" || USER_ID == "") {
    console.log("ERROR: USER_ID must equal your Habitica User ID.\n\neg. const USER_ID = \"abcd1234-ef56-gh78-ij90-abcdef123456\";\n\nYour Habitica User ID can be found at https://habitica.com/user/settings/api");
    valid = false;
  }

  if (typeof API_TOKEN !== "string" || API_TOKEN == "") {
    console.log("ERROR: API_TOKEN must equal your Habitica API Token.\n\neg. const API_TOKEN = \"abcd1234-ef56-gh78-ij90-abcdef123456\";\n\nYour Habitica API Token can be found at https://habitica.com/user/settings/api");
    valid = false;
  }

  if (valid) {
    try {
      fetch("https://habitica.com/api/v3/user", GET_PARAMS);
    } catch (e) {
      if (e.stack.includes("There is no account that uses those credentials")) {
        console.log("ERROR: Your USER_ID and/or API_TOKEN is incorrect. Both of these can be found at https://habitica.com/user/settings/api");
        valid = false;
      }
    }
  }

  if (typeof RESERVE_GOLD !== "number" || RESERVE_GOLD < 0) {
    console.log("ERROR: RESERVE_GOLD must be a positive number.\n\neg. const RESERVE_GOLD = 0;\n    const RESERVE_GOLD = 22.5;");
    valid = false;
  }

  if (!valid) {
    console.log("Please fix the above errors and run the install function again.");
  }

  return valid;
}

 /**
 * fetch(url, params)
 * 
 * Wrapper for Google Apps Script's UrlFetchApp.fetch(url, params):
 * https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app#fetchurl,-params
 * 
 * Retries failed API calls up to 2 times, retries for up to 1 min if 
 * Habitica's servers are down, & handles Habitica's rate limiting.
 */
let rateLimitRemaining;
let rateLimitReset;
function fetch(url, params) {

  // try up to 3 times
  for (let i=0; i<3; i++) {

    // if rate limit reached
    if (rateLimitRemaining != null && Number(rateLimitRemaining) < (API_CALLS_LEFT + 1)) {

      // wait until rate limit reset
      let waitUntil = new Date(rateLimitReset);
      waitUntil.setSeconds(waitUntil.getSeconds() + 1);
      let now = new Date();
      Utilities.sleep(Math.max(waitUntil.getTime() - now.getTime(), 0));
    }

    // call API
    let response;
    while (true) {
      try {
        response = UrlFetchApp.fetch(url, params);
        break;

      // if address unavailable, wait 5 seconds & try again
      } catch (e) {
        if (e.stack.includes("Address unavailable")) {
          Utilities.sleep(5000);
        } else {
          throw e;
        }
      }
    }

    // store rate limiting data
    rateLimitRemaining = response.getHeaders()["x-ratelimit-remaining"];
    rateLimitReset = response.getHeaders()["x-ratelimit-reset"];

    // if success, return response
    if (response.getResponseCode() < 300) {
      return response;

    // if rate limited due to running multiple scripts, try again
    } else if (response.getResponseCode() === 429) {
      i--;

    // if 3xx or 4xx or failed 3 times, throw exception
    } else if (response.getResponseCode() < 500 || i >= 2) {
      throw new Error("Request failed for https://habitica.com returned code " + response.getResponseCode() + ". Truncated server response: " + response.getContentText());
    }
  }
}

function buyenchantedarmorie() {
  try {

    let user = JSON.parse(fetch("https://habitica.com/api/v3/user", GET_PARAMS)).data;

    let numBuy = Math.floor((user.stats.gp - RESERVE_GOLD) / 100);
    console.log("Buying Enchanted Armorie " + numBuy + " time(s)");

    for (let i=0; i<numBuy; i++) {
      fetch("https://habitica.com/api/v3/user/buy-armoire", POST_PARAMS);
    }

  } catch (e) {
    MailApp.sendEmail(
      Session.getEffectiveUser().getEmail(),
      DriveApp.getFileById(ScriptApp.getScriptId()).getName() + " failed!",
      e.stack
    );
    console.error(e.stack);
    throw e;
  }
}

/**
 * getUser(updated)
 * 
 * Fetches user data from the Habitica API if it hasn't already 
 * been fetched during this execution, or if updated is set to 
 * true.
 */
let user;
function getUser(updated) {
  if (updated || typeof user === "undefined") {
    for (let i=0; i<3; i++) {
      user = fetch("https://habitica.com/api/v3/user", GET_PARAMS);
      try {
        user = JSON.parse(user).data;
        if (typeof user.party?._id !== "undefined") {
          scriptProperties.setProperty("PARTY_ID", user.party._id);
        }
        break;
      } catch (e) {
        if (i < 2 && (e.stack.includes("Unterminated string in JSON") || e.stack.includes("Expected ',' or '}' after property value in JSON at position"))) {
          continue;
        } else {
          throw e;
        }
      }
    }
  }
  return user;
}
