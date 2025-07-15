import { useAuthStore } from "@/store/auth-store";
import React from "react";
import ServiceProviderHomepage from "./service-provider-homepage";
import ServiceSeekerHomepage from "./service-seeker-homepage";

export default function Homepage() {
   const { user } = useAuthStore();



   const isServiceSeeker = user?.userRole === "SERVICE_SEEKER";
   if (isServiceSeeker) {
      return <ServiceSeekerHomepage />;
   } else {
      return <ServiceProviderHomepage />;
   }
}
