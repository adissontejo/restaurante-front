import Home from "../../assets/home.svg?react";
import Marker from "../../assets/marker.svg?react";
import Clock from "../../assets/clock.svg?react";
import Gift from "../../assets/gift.svg?react";

export const steps = [
  {
    key: "exhibition",
    icon: Home,
  },
  {
    key: "address",
    icon: Marker,
  },
  {
    key: "schedules",
    icon: Clock,
  },
  {
    key: "coupons",
    icon: Gift,
  },
] as const;
