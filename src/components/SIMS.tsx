import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { Dashboard } from "./Dashboard";
import { StudentList } from "./StudentList";
import { StudentDetail } from "./StudentDetail";
import { StudentForm } from "./StudentForm";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";
import { Student } from "@/types/student";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockStudents: Student[] = [
  {
    id: "1",
    nis: "2021001",
    name: "Ahmad Fadli Rahman",
    email: "ahmad.fadli@email.com",
    phone: "081234567890",
    address: "Jl. Merdeka No. 123, Jakarta Pusat",
    birthDate: "2005-03-15",
    class: "XI-1 IPA",
    averageGrade: 85.5,
    status: "active",
    enrollmentDate: "2021-07-15",
  },
  {
    id: "2",
    nis: "2021002",
    name: "Sari Dewi Lestari",
    email: "sari.dewi@email.com",
    phone: "081234567891",
    address: "Jl. Sudirman No. 456, Jakarta Selatan",
    birthDate: "2005-07-22",
    class: "XI-2 IPS",
    averageGrade: 88.2,
    status: "active",
    enrollmentDate: "2021-07-15",
  },
  {
    id: "3",
    nis: "2021003",
    name: "Budi Santoso",
    email: "budi.santoso@email.com",
    phone: "081234567892",
    address: "Jl. Thamrin No. 789, Jakarta Pusat",
    birthDate: "2005-01-10",
    class: "XII-1 IPA",
    averageGrade: 90.1,
    status: "active",
    enrollmentDate: "2020-07-15",
  },
];

const mockDashboardData = {
  totalStudents: 847,
  totalClasses: 24,
  activeStudents: 832,
  averageGrade: 82.5,
};

export const SIMS = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [view, setView] = useState<"list" | "detail" | "form">("list");
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const { toast } = useToast();

  const handleLogin = (user: string, password: string) => {
    // Simple validation - in real app, this would be API call
    if (user === "admin" && password === "admin123") {
      setIsAuthenticated(true);
      setUsername(user);
      toast({
        title: "Login Berhasil",
        description: "Selamat datang di BKK BRAKA!",
      });
    } else {
      toast({
        title: "Login Gagal",
        description: "Username atau password salah",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setActiveTab("dashboard");
    setView("list");
    setSelectedStudent(null);
    setEditingStudent(null);
    toast({
      title: "Logout Berhasil",
      description: "Anda telah keluar dari sistem",
    });
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setView("detail");
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setView("form");
  };

  const handleAddStudent = () => {
    setEditingStudent(null);
    setView("form");
  };

  const handleDeleteStudent = (student: Student) => {
    setStudents(prev => prev.filter(s => s.id !== student.id));
    toast({
      title: "Berhasil",
      description: `Data siswa ${student.name} telah dihapus`,
    });
  };

  const handleSaveStudent = (studentData: Omit<Student, 'id'>) => {
    if (editingStudent) {
      // Update existing student
      setStudents(prev => prev.map(s => 
        s.id === editingStudent.id 
          ? { ...studentData, id: editingStudent.id }
          : s
      ));
    } else {
      // Add new student
      const newStudent: Student = {
        ...studentData,
        id: Date.now().toString(),
      };
      setStudents(prev => [...prev, newStudent]);
    }
    setView("list");
    setEditingStudent(null);
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedStudent(null);
    setEditingStudent(null);
  };

  const renderStudentContent = () => {
    if (view === "detail" && selectedStudent) {
      return (
        <StudentDetail
          student={selectedStudent}
          onBack={handleBackToList}
          onEdit={handleEditStudent}
        />
      );
    }
    
    if (view === "form") {
      return (
        <StudentForm
          student={editingStudent}
          onSave={handleSaveStudent}
          onCancel={handleBackToList}
        />
      );
    }

    return (
      <StudentList
        students={students}
        onAddStudent={handleAddStudent}
        onViewStudent={handleViewStudent}
        onEditStudent={handleEditStudent}
        onDeleteStudent={handleDeleteStudent}
      />
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard data={mockDashboardData} />;
      case "students":
        return renderStudentContent();
      case "profile":
        return (
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-2xl font-bold text-foreground">Profil Pengguna</h1>
            <div className="text-muted-foreground">Halaman profil sedang dalam pengembangan.</div>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-2xl font-bold text-foreground">Pengaturan</h1>
            <div className="text-muted-foreground">Halaman pengaturan sedang dalam pengembangan.</div>
          </div>
        );
      default:
        return <Dashboard data={mockDashboardData} />;
    }
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-surface">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
        username={username}
      />
      
      <div className="md:ml-64">
        <main className="p-4 md:p-6 pb-20 md:pb-6">
          {renderContent()}
        </main>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};