import Footer from "@/components/Footer";
import StickyNav from "@/components/StickyNav";
import WhatsAppButton from "@/components/WhatsAppButton";

const PageShell = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background text-foreground">
    <StickyNav />
    <main>{children}</main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default PageShell;
