import { MessageCircleIcon } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import { Button } from "@/components/ui/button"

const chatHistory = [
    {
        title: "Project Brainstorm",
        url: "#",
        icon: MessageCircleIcon,
    },
    {
        title: "Bug Fix Discussion",
        url: "#",
        icon: MessageCircleIcon,
    },
    {
        title: "Team Sync 2024-04-01",
        url: "#",
        icon: MessageCircleIcon,
    },
    {
        title: "API Design Notes",
        url: "#",
        icon: MessageCircleIcon,
    },
]

export function AppSidebar() {
    return (
        <Sidebar className="">
            <SidebarContent className="p-2">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <Button variant="outline" className="w-full">
                            Create new conversation
                        </Button>
                    </SidebarGroupContent>

                    <SidebarGroupLabel className="">Chat History</SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {chatHistory.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}