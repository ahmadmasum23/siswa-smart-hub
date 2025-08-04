import { Button } from "@/components/ui/button";
import { Home, Users, Settings, User } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'students', label: 'Siswa', icon: Users },
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg md:hidden">
      <div className="flex items-center justify-around p-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 flex-col gap-1 h-auto py-2 ${
              activeTab === tab.id 
                ? 'text-primary bg-primary/10' 
                : 'text-muted-foreground'
            }`}
          >
            <tab.icon className="h-5 w-5" />
            <span className="text-xs">{tab.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};