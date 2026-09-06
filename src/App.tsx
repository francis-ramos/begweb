import "./index.css";

import {
  Routes,
  Route
} from "react-router-dom";

import PageLost from "@/pages/Lost";
import PageIndex from "@/pages/Index";
import PageLogin from "@/pages/Login";
import PageCreate from "@/pages/Create";

export function App() {
  return (
    <Routes>
      <Route path="*" element={<PageLost />} />
      <Route path="/" element={<PageIndex />} />
      <Route path="/login" element={<PageLogin />} />
      <Route path="/create" element={<PageCreate />} />
    </Routes>
  );
}

export default App;
