import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Home, Users, Settings, User, LogOut, GraduationCap } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  username: string;
}

export const Sidebar = ({ activeTab, onTabChange, onLogout, username }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'students', label: 'Data Siswa', icon: Users },
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <Card className="flex flex-col h-full shadow-lg rounded-none border-r">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            {/* <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div> */}
            <div className="flex items-center space-x-3">
              <img
                src="/Brantas.png"
                alt="Logo Brantas"
                className="w-10 h-10 object-contain"
              />
              <div>
                <h1 className="font-bold text-lg text-foreground">BKK</h1>
                <p className="text-xs text-muted-foreground">SMK Brantas Karangkates</p>
              </div>
            </div>

          </div>
        </div>


        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              onClick={() => onTabChange(item.id)}
              className={`w-full justify-start gap-3 h-11 ${activeTab === item.id
                ? 'bg-gradient-primary text-primary-foreground shadow-md'
                : 'text-muted-foreground hover:text-foreground hover:bg-surface-variant/50'
                }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </nav>
        {/* User Info with Logout Button */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between gap-3">
            {/* Avatar + Name */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{username}</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
            </div>

            {/* Logout Button */}
            <Button
              variant="ghost"
              onClick={onLogout}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>

      </Card>
    </div>
  );
};