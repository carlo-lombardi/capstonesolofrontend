let geocoder;
function geocode(address) {
  geocoder.geocode({ address: address }, function (results, status) {
    if (status == "OK") {
      console.log("full object: ", JSON.stringify(results, null, 2));
      let addressData = JSON.parse(JSON.stringify(results, null, 2));
      console.log("formatted_address: ", addressData[0].formatted_address);
      console.log("lat: ", addressData[0].geometry.location.lat);
      console.log("lng: ", addressData[0].geometry.location.lng);
    } else {
      const field = document.getElementById("filedGeoCode");
      field.style.color = "red";
      field.innerHTML = "Insert a location";
    }
  });
}

export function initialize(searchEngine) {
  //google.maps.event.addDomListener(window, 'load', initialize);
  geocoder = new window.google.maps.Geocoder();
  const input = document.getElementById("searchTextField");
  // const submitButton = document.getElementById("geocodeButton");
  // submitButton.addEventListener("click", () => geocode(searchEngine));
  geocode(searchEngine);

  const options = {
    componentRestrictions: { country: "ie" },
    fields: ["address_components", "geometry", "icon", "name"],
    strictBounds: false,
    types: ["address"],
  };
  const autocomplete = new window.google.maps.places.Autocomplete(
    input,
    options
  );
  // address_component, adr_address, business_status, formatted_address, geometry, icon, name, permanently_closed, photo, place_id, plus_code, type, url, utc_offset, vicinity
  autocomplete.setFields(["place_id", "geometry", "name"]);
}
