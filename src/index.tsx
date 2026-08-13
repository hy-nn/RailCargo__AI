import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainMargin } from "./screens/MainMargin";
import { Login } from "./screens/Login";
import { PostLoginHome } from "./screens/PostLoginHome";
import { HomeGuest } from "./screens/HomeGuest";
import { RailNaturalInput } from "./screens/RailNaturalInput";
import { RailBookingConfirm } from "./screens/RailBookingConfirm";
import { RailRoadNaturalInput } from "./screens/RailRoadNaturalInput";
import { RailRoadRecommended } from "./screens/RailRoadRecommended";
import { RailRoadBookingConfirm } from "./screens/RailRoadBookingConfirm";
import { RailForwardingNaturalInput } from "./screens/RailForwardingNaturalInput";
import { RailForwardingRecommended } from "./screens/RailForwardingRecommended";
import { RailForwardingBookingConfirm } from "./screens/RailForwardingBookingConfirm";
import { Settings } from "./screens/Settings";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeGuest />} />
        <Route path="/03_home_guest" element={<HomeGuest />} />
        <Route path="/01_login" element={<Login />} />
        <Route path="/02_home_loggedin" element={<PostLoginHome />} />
        <Route path="/04_rail_nlp_input" element={<RailNaturalInput />} />
        <Route path="/05_rail_recommend" element={<MainMargin />} />
        <Route path="/06_rail_confirm" element={<RailBookingConfirm />} />
        <Route path="/07_road_nlp_input" element={<RailRoadNaturalInput />} />
        <Route path="/08_road_recommend" element={<RailRoadRecommended />} />
        <Route path="/09_road_confirm" element={<RailRoadBookingConfirm />} />
        <Route
          path="/10_forwarding_nlp_input"
          element={<RailForwardingNaturalInput />}
        />
        <Route
          path="/11_forwarding_recommend"
          element={<RailForwardingRecommended />}
        />
        <Route
          path="/12_forwarding_confirm"
          element={<RailForwardingBookingConfirm />}
        />
        <Route path="/13_settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
