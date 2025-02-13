import * as React from "react";
import { ChevronRight } from "lucide-react";

import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible.jsx";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import FilterByComponent from "./FilterByComponent";
import FilterByPriceComponent from "./FilterByPriceComponent";

const Filters = ["Home"];

export function AppSidebar({ ...props }) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="text-4xl overflow-hidden">
        <Link href="/">
          <VersionSwitcher
            className="text-4xl"
            versions={Filters}
            defaultVersion={Filters[0]}
          />
        </Link>
      </SidebarHeader>
      <SidebarContent className="gap-0  overflow-hidden">
        <FilterByPriceComponent></FilterByPriceComponent>
        <div className="overflow-x-hidden">
          <FilterByComponent></FilterByComponent>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
