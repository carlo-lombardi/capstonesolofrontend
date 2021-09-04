import React, { useState, useEffect, useRef } from "react";

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["(cities)"], componentRestrictions: { country: "us" } }
  );
  autoComplete.setFields(["address_components", "formatted_address"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
}

async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
  console.log(addressObject);
}

function SearchLocationInput() {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAZvObCB1q963yYsuzNV72sPnJxvF5dLeA&libraries=places",
      // `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  return (
    <div className="search-location-input">
      <input
        ref={autoCompleteRef}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Enter a City"
        value={query}
      />
    </div>
  );
}

export default SearchLocationInput;

// import React, { useState } from "react";
// export default function Address() {
//   let autocomplete; /* google.maps.places.Autocomplete; */
//   /*   let address1Field; HTMLInputElement;
//   let address2Field; HTMLInputElement;
//   let postalField; HTMLInputElement; */
//   const [address1Field, setAddress1Field] = useState("");
//   const [address2Field, setAddress2Field] = useState("");
//   const [postalField, setPostalField] = useState("");
//   const [locality, setLocality] = useState("");
//   const [stateOf, setStateOf] = useState("");
//   const [country, setCountry] = useState("");

//   function initAutocomplete() {
//     /*   address1Field = document.querySelector("#ship-address") as HTMLInputElement;
//   address2Field = document.querySelector("#address2") as HTMLInputElement;
//   postalField = document.querySelector("#postcode") as HTMLInputElement; */

//     // Create the autocomplete object, restricting the search predictions to
//     // addresses in the US and Canada.
//     autocomplete = new window.google.maps.places.Autocomplete(address1Field, {
//       componentRestrictions: { country: ["us", "ca"] },
//       fields: ["address_components", "geometry"],
//       types: ["address"],
//     });

//     // When the user selects an address from the drop-down, populate the
//     // address fields in the form.
//     autocomplete.addListener("place_changed", fillInAddress);
//   }

//   function fillInAddress() {
//     // Get the place details from the autocomplete object.
//     const place = autocomplete.getPlace();
//     let address1 = "";
//     let postcode = "";

//     // Get each component of the address from the place details,
//     // and then fill-in the corresponding field on the form.
//     // place.address_components are google.maps.GeocoderAddressComponent objects
//     // which are documented at http://goo.gle/3l5i5Mr
//     for (const component of place.address_components /* as google.maps.GeocoderAddressComponent[] */) {
//       // @ts-ignore remove once typings fixed
//       const componentType = component.types[0];

//       switch (componentType) {
//         case "street_number": {
//           address1 = `${component.long_name} ${address1}`;
//           break;
//         }

//         case "route": {
//           address1 += component.short_name;
//           break;
//         }

//         case "postal_code": {
//           postcode = `${component.long_name}${postcode}`;
//           break;
//         }

//         case "postal_code_suffix": {
//           postcode = `${postcode}-${component.long_name}`;
//           break;
//         }

//         case "locality":
//           /* (document.querySelector("#locality") as HTMLInputElement).value =
//         component.long_name; */
//           setLocality(component.long_name);
//           break;

//         case "administrative_area_level_1": {
//           /*  (document.querySelector("#state") as HTMLInputElement).value =
//           component.short_name; */
//           setStateOf(component.short_name);
//           break;
//         }

//         case "country":
//           /* (document.querySelector("#country") as HTMLInputElement).value =
//           component.long_name; */
//           setCountry(component.long_name);
//           break;
//       }
//     }

//     /*   address1Field.value = address1;
//   postalField.value = postcode; */
//     setAddress1Field(address1);
//     setPostalField(postcode);
//     // After filling the form with address components from the Autocomplete
//     // prediction, set cursor focus on the second address line to encourage
//     // entry of subpremise information such as apartment, unit, or floor number.
//     address2Field.focus();
//   }
//   return (
//     <form id="address-form" action="" method="get" autocomplete="off">
//       <label class="full-field">
//         {/* Avoid the word "address" in id, name, or label text to avoid browser autofill from conflicting with Place Autocomplete. Star or comment bug https://crbug.com/587466 to request Chromium to honor autocomplete="off" attribute.*/}
//         <span class="form-label">Deliver to*</span>
//         <input
//           id="ship-address"
//           name="ship-address"
//           value={address1Field}
//           onChange={(e) => setAddress1Field(e.target.value)}
//           required
//           autocomplete="off"
//         />
//       </label>
//       <label class="full-field">
//         <span class="form-label">Apartment, unit, suite, or floor #</span>
//         <input
//           id="address2"
//           name="address2"
//           value={address2Field}
//           onChange={(e) => setAddress2Field(e.target.value)}
//         />
//       </label>
//       <label class="full-field">
//         <span class="form-label">City*</span>
//         <input
//           id="locality"
//           name="locality"
//           value={locality}
//           onChange={(e) => setLocality(e.target.value)}
//           required
//         />
//       </label>
//       <label class="slim-field-left">
//         <span class="form-label">State/Province*</span>
//         <input
//           id="state"
//           name="state"
//           value={stateOf}
//           onChange={(e) => setStateOf(e.target.value)}
//           required
//         />
//       </label>
//       <label class="slim-field-right" for="postal_code">
//         <span class="form-label">Postal code*</span>
//         <input
//           id="postcode"
//           name="postcode"
//           value={postalField}
//           onChange={(e) => setPostalField(e.target.value)}
//           required
//         />
//       </label>
//       <label class="full-field">
//         <span class="form-label">Country/Region*</span>
//         <input
//           id="country"
//           name="country"
//           value={country}
//           onChange={(e) => setCountry(e.target.value)}
//           required
//         />
//       </label>
//       <button type="button" class="my-button">
//         Save address
//       </button>
//     </form>
//   );
// }
