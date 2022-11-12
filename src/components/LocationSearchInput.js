import { useRef, useEffect } from "react";

const LocationSearchInput = ({classes, locationPlaceholder, setAddress}) => {
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
    console.log(place);
    setAddress(place);
   });
 }, []);
 return (
  <div className={classes ? classes : ''}>
    <input
        className="login__textBox mb-0 w-100"
        ref={inputRef}
        placeholder={locationPlaceholder ? locationPlaceholder : 'Enter a location'}
         />
  </div>
 );
};
export default LocationSearchInput;