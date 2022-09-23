import React from "react";
import { useEffect, useState, useRef, useCallback } from "react";
import { COUNTRIES_DATA } from "./data/countries_data";
import HEX_DATA from "./data/countries_hex_data.json";
import Globe from "react-globe.gl";

const getRandomCountry = () => {
  return COUNTRIES_DATA[COUNTRIES_DATA.length - 1];
};

export default function CustomGlobe() {
  const globeEl = useRef();
  const country = getRandomCountry();
  const [selectedCountry, setSelectedCountry] = useState({
    lat: -25.874938,
    lng: 28.193628,
    label: ""
  });
  const [hex, setHex] = useState({ features: [] });

  useEffect(() => {
    setHex(HEX_DATA);
  }, []);

  /*  useEffect(() => {
    let interval;

    interval = setInterval(() => {
      (async () => {
        const country = getRandomCountry();
        setSelectedCountry({
          lat: country.latitude,
          lng: country.longitude,
          label: country.name
        });
      })();
    }, 3000); //Every 3 seconds
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []); */

  useEffect(() => {
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.9;

    const MAP_CENTER = { lat: 0, lng: 0, altitude: 2.5 };
    globeEl.current.pointOfView(MAP_CENTER, 0);
  }, [globeEl]);

  useEffect(() => {
    const countryLocation = {
      lat: selectedCountry.lat,
      lng: selectedCountry.lng,
      altitude: 1.5
    };

    globeEl.current.pointOfView(countryLocation, 0);
  }, [selectedCountry]);

  const N = 30;
  const arcsData = [...Array(N).keys()].map(() => ({
    startLat: -25.874938,
    startLng: 28.193628,
    color: "white"
  }));
  
  for(let i = 0; i < N; i++){
    let selectCountry = COUNTRIES_DATA[Math.floor(Math.random()*(COUNTRIES_DATA.length - 1))];
    arcsData[i].endLat = selectCountry.latitude;
    arcsData[i].endLng = selectCountry.longitude;
  }

  return (
    <Globe
      globeImageUrl={"https://raw.githubusercontent.com/jpillay07/factglobe/main/public/factdarkb.jpg"}
      ref={globeEl}
      backgroundColor="rgba(52, 52, 52, 0)"
      labelsData={[selectedCountry]}
      arcsData={arcsData}
      arcDashLength={0.5}
      arcDashGap={Math.random()}
      arcDashAnimateTime={15000}
      arcColor={"color"}
      labelText={"label"}
      labelSize={1.6}
      labelColor={useCallback(() => "white", [])}
      labelDotRadius={0.4}
      labelAltitude={0.05}
      hexPolygonsData={hex.features}
      hexPolygonResolution={3} //values higher than 3 makes it buggy
      hexPolygonMargin={0.62}
      color={"#fff"}
      hexPolygonColor={useCallback(() => "#5683e5", [])}
    />
  );
}
