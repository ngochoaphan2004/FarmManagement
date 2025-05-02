import "../../globals.css";
import { FloatingNav } from "@/components/Navbar/FloatingNavbar";
import { SessionProvider } from "@/providers/SessionProvider";
import SidebarProvider from "@/providers/SidebarProvider";
import Sidebar from "@/components/Sidebar";

export default function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <section className="no-scrollbar hide-scrollbar">
      <SidebarProvider>
        <FloatingNav />
        <Sidebar />
        {props.children}
        {props.modal}
        <div id="modal-root" />
        <FloatingNav />
      </SidebarProvider>
    </section>
  );
}
