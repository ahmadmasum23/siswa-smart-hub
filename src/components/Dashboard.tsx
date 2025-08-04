import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, UserCheck, TrendingUp } from "lucide-react";

interface DashboardProps {
  data: {
    totalStudents: number;
    totalClasses: number;
    activeStudents: number;
    averageGrade: number;
  };
}

export const Dashboard = ({ data }: DashboardProps) => {
  const stats = [
    {
      title: "Total Siswa",
      value: data.totalStudents.toLocaleString(),
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Jumlah Kelas",
      value: data.totalClasses.toString(),
      icon: BookOpen,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Siswa Aktif",
      value: data.activeStudents.toLocaleString(),
      icon: UserCheck,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Rata-rata Nilai",
      value: data.averageGrade.toFixed(1),
      icon: TrendingUp,
      color: "text-primary-variant",
      bgColor: "bg-primary-variant/10",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Ringkasan data sistem informasi siswa</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Siswa baru terdaftar</p>
                  <p className="text-xs text-muted-foreground">Ahmad Fadli - Kelas X-1</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Data nilai diperbarui</p>
                  <p className="text-xs text-muted-foreground">Mata Pelajaran Matematika</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Laporan bulanan selesai</p>
                  <p className="text-xs text-muted-foreground">Bulan November 2024</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Kelas Populer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">X-1 IPA</span>
                <span className="text-sm text-muted-foreground">32 siswa</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">XI-2 IPS</span>
                <span className="text-sm text-muted-foreground">30 siswa</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">XII-1 IPA</span>
                <span className="text-sm text-muted-foreground">28 siswa</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">X-3 IPS</span>
                <span className="text-sm text-muted-foreground">31 siswa</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};