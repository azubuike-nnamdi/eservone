import { useUser } from "@/context/user-context";
import React from "react";
import ServiceProviderHomepage from "./service-provider-homepage";
import ServiceSeekerHomepage from "./service-seeker-homepage";

export default function Homepage() {
   const { user } = useUser();


   const isServiceSeeker = user?.userRole === "SERVICE_SEEKER";
   if (isServiceSeeker) {
      return <ServiceSeekerHomepage />;
   } else {
      return <ServiceProviderHomepage />;
   }
}
