import { useRef, useEffect } from "react";

const AutoComplete = () => {
 const autoCompleteRef = useRef();
 const inputRef = useRef();
 const options = {
  componentRestrictions: { country: "ca" },
  fields: ["address_components", "adr_address", "formatted_address","vicinity", "type", "price_level", "geometry", "icon", "name"],
//   types: ["establishment"]
 };
 useEffect(() => {
  autoCompleteRef.current = new window.google.maps.places.Autocomplete(
   inputRef.current,
   options
  );
  autoCompleteRef.current.addListener("place_changed", async function () {
    const place = await autoCompleteRef.current.getPlace();
    console.log({ place });
   });
 }, []);
 return (
  <div>
   <label>enter address :</label>
   <input ref={inputRef} />
  </div>
 );
};
export default AutoComplete;