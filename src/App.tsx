import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContactPage from "@/pages/ContactPage";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import ProcessPage from "@/pages/ProcessPage";
import ProjectsPage from "@/pages/ProjectsPage";
import WorkshopPage from "@/pages/WorkshopPage";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/taller" element={<WorkshopPage />} />
      <Route path="/proyectos" element={<ProjectsPage />} />
      <Route path="/proceso" element={<ProcessPage />} />
      <Route path="/contacto" element={<ContactPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
