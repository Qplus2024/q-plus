import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Login from "./pages/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import PropertyList from "./pages/admin/properties/PropertyList";
import PropertyCreate from "./pages/admin/properties/PropertyCreate";
import PropertyEdit from "./pages/admin/properties/PropertyEdit";
import BlocksConfig from "./pages/admin/configuracion/BlocksConfig";
import FeaturedSectionsList from "./pages/admin/contenido/FeaturedSectionsList";
import Inversiones from "./pages/Inversiones";
import Herramientas from "./pages/Herramientas";
import MesaInversionistas from "./pages/MesaInversionistas";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/**
 * A property detail page lives at /propiedad/:slug (singular), but links
 * pointing at /propiedades/:slug (plural) exist in the wild — older builds of
 * the home page carousel produced them, and admins can type one into a
 * featured section's CTA. Instead of a 404, send those visitors to the real
 * page.
 */
const LegacyPropertyRedirect = () => {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/propiedad/${slug}`} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/propiedades" element={<Properties />} />
              <Route path="/propiedad/:slug" element={<PropertyDetail />} />
              {/* Legacy/incorrect plural URLs -> real detail page */}
              <Route path="/propiedades/:slug" element={<LegacyPropertyRedirect />} />
              <Route path="/inversiones" element={<Inversiones />} />
              <Route path="/herramientas" element={<Herramientas />} />
              <Route path="/mesa-inversionistas" element={<MesaInversionistas />} />
              <Route path="/login" element={<Login />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="propiedades" element={<PropertyList />} />
                <Route path="propiedades/nueva" element={<PropertyCreate />} />
                <Route path="propiedades/:id" element={<PropertyEdit />} />
                <Route path="contenido-destacado" element={<FeaturedSectionsList />} />
                <Route path="configuracion/bloques" element={<BlocksConfig />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
