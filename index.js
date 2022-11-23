const info_json = require("./ticket_search.json");
const otrs_data = require("./.env");
const search_url = otrs_data["api"]["ticketSearchURL"];
const get_url = otrs_data["api"]["ticketGetURL"];
const create_url = otrs_data["api"]["ticketCreateURL"];
const fetch_options = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(info_json),
};

async function fetchOTRS(url, options = fetch_options) {
  const response = await fetch(url, options);
  const json = await response.json();
  return await json;
}

async function ticketSearch() {
  const json = await fetchOTRS(search_url);
  if (json === null || json === undefined) {
    console.log("NO TICKETS RETURNED ON QUERY!");
    return null;
  }
  return await json["TicketID"];
}

async function ticketGet(ticketID) {
  const url = `${get_url}/${ticketID}`;
  const json = await fetchOTRS(url);

  if (json === null || json["Ticket"] === undefined) {
    console.log("TICKET NOT FOUND");
    return null;
  }

  return json["Ticket"];
}


