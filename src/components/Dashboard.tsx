import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, UserCheck, TrendingUp,Briefcase,GraduationCap } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, PieChart, Pie, Cell, Legend
} from "recharts";

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
      title: "Total Murid",
      value: "34",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Alumni Yang Sudah Bekerja",
      value: "5245",
      icon: Briefcase,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Alumni Yang Belum Bekerja",
      value: "129",
      icon: GraduationCap,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];
const alumniData = [
    { name: "Entrepreneur", value: 40 },
    { name: "Employee", value: 35 },
    { name: "Unemployed", value: 25 },
  ];

  const COLORS = ["#4F46E5", "#A78BFA", "#10B981"];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Ringkasan data sistem informasi siswa</p>
      </div>

      {/* Cards */}

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

      {/* Aktivitas & Kelas Populer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* <Card className="shadow-md">
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
        </Card> */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Distribusi Siswa</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={alumniData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {alumniData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Grafik Nilai & Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Perkembangan Nilai Rata-rata</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={alumniData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bulan" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="nilai" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card> 

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Kelas Populer</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={alumniData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="siswa" fill="#4F46E5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        */}

        
      </div>
    </div>
  );
};
