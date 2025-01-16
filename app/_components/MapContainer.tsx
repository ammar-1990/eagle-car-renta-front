'use client'


import { Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
 
const Locations = dynamic(()=>import("./Locations"),{ssr:false})
 

  type Props = {}

const Map = (props: Props) => {
  return (
 <Locations />
  )
}

export default Map