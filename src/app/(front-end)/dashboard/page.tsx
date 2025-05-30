import Image from "next/image";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar"

export default function Home() {
  return (
    <div>
      <Sidebar>
        <SidebarContent />
      </Sidebar>
    </div>
  );
}
