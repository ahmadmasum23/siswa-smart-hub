import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, GraduationCap } from "lucide-react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
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
        <p className="text-muted-foreground">Ringkasan data alumni sekolah</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      {/* Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Data Alumni Sekolah</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={alumniData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
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
    </div>
  );
};

export default Dashboard;