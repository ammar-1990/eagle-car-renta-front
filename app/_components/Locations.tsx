"use client";

import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import SectionHeader from "./SectionHeader";
import { Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import markerIcon from "/Logo.png"; // Default marker icon
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import { TEST_LOCATIONS } from "@/lib/Types";
import { Button } from "@/components/ui/button";
import { cn, formatPhoneNumber } from "@/lib/utils";
import { Phone } from "lucide-react";
import SuperButton from "@/components/SuperButton";
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  {
    ssr: false,
  }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  {
    ssr: false,
  }
);

type Props = {};

const Locations = (props: Props) => {
  const [mount, setMount] = useState(false);
  const DEFAULT_LOCATION = TEST_LOCATIONS[0];
  const [center, setCenter] = useState<{
    center: LatLngExpression;
    id: number;
    name: string;
    phone: string;
    addrees: string;
    href: string;
  }>({
    center: [DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng],
    id: DEFAULT_LOCATION.id,
    name: DEFAULT_LOCATION.name,
    phone: DEFAULT_LOCATION.phone,
    addrees: DEFAULT_LOCATION.address,
    href: DEFAULT_LOCATION.href,
  });

  const [custom, setCustom] = useState<
    | L.Icon<{
        iconUrl: string;
        shadowUrl: string;
        iconSize: [number, number];
        iconAnchor: [number, number];
        popupAnchor: [number, number];
      }>
    | undefined
  >(undefined);
  
 
  useEffect(() => {
    setMount(true);
    if (typeof window !== undefined) {
      const customInstance = new window.L.Icon({
        iconUrl: "/marker.webp", // Convert to string
        shadowUrl: markerShadow.toString(),
        iconSize: [41, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });
      setCustom(customInstance);
    }

    
  }, []);





  if (!mount) return null;

  return (
    <div>
      <SectionHeader
        title="Car Rental Locations"
        description="Find us wherever you land"
      />

      <Container>
        <div className="flex items-center gap-2 mt-[28px] justify-center">
          {TEST_LOCATIONS.map((location) => (
            <Button
              className={cn(
                "bg-white hover:bg-white border-site-primary text-site-primary border shadow-none rounded-full",
                center.id === location.id &&
                  "text-white bg-site-primary hover:bg-site-primary"
              )}
              onClick={() =>
                setCenter({
                  center: [location.lat, location.lng],
                  id: location.id,
                  name: location.name,
                  phone: location.phone,
                  addrees: location.address,
                  href: location.href,
                })
              }
              key={`botton-location-${location.id}`}
            >
              {location.name}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-[24px]">
          <div className="w-full aspect-square rounded-md overflow-hidden  ">
            <MapContainer
              scrollWheelZoom={false} // Disable scroll wheel zoom
              className="z-[1]"
              key={center.id}
              center={center.center}
              zoom={18}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />

              <Marker position={center.center} icon={custom}>
                <Popup>{center.addrees}</Popup>
              </Marker>
            </MapContainer>
          </div>

          <div className="p-[20px] flex   justify-center flex-col items-center gap-[25px]">
            <h3 className="text-site-primary font-600 text-[28px]">
              Eagle Car Rental
            </h3>
            <p className="text-[#000000B2]">{center.addrees}</p>
            <Phone className="text-site-primary w-[33px] h-[33px]" />
            <p className="text-[#000000B2] text-[14px]">
              Office: {formatPhoneNumber(center.phone)}
            </p>
            <div className="flex items-center gap-[12.5px]">
              <SuperButton
                buttonType="linkButton"
                target="_blank"
                className=" rounded-[16px] h-[47px] w-[154px]"
                title="Get Directions"
                variant="site"
                href={center.href}
              />
              <SuperButton
                buttonType="linkButton"
                className=" rounded-[16px] h-[47px] bg-site-secondary hover:bg-site-secondary/85 w-[154px]"
                title="Reserve a Car"
                variant="site"
                href={"/cars"}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Locations;
