import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { Student } from "@/types/student";

interface StudentListProps {
  students: Student[];
  onAddStudent: () => void;
  onViewStudent: (student: Student) => void;
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (student: Student) => void;
}

export const StudentList = ({
  students,
  onAddStudent,
  onViewStudent,
  onEditStudent,
  onDeleteStudent,
}: StudentListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(students);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = students.filter(
      (student) =>
        student.nis.toLowerCase().includes(term.toLowerCase()) ||
        student.name.toLowerCase().includes(term.toLowerCase()) ||
        student.email.toLowerCase().includes(term.toLowerCase()) ||
        student.class.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Data Siswa</h1>
          <p className="text-muted-foreground">Kelola data siswa sekolah</p>
        </div>
        <Button onClick={onAddStudent} className="bg-gradient-primary hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          Tambah Siswa
        </Button>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Cari berdasarkan NIS, nama, email, atau kelas..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {searchTerm ? "Tidak ada siswa yang sesuai dengan pencarian" : "Belum ada data siswa"}
              </div>
            ) : (
              filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-surface-variant/50 transition-colors"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-foreground">{student.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {student.class}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>NIS: {student.nis}</p>
                      <p>Email: {student.email}</p>
                      <p>Alamat: {student.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewStudent(student)}
                      className="text-primary hover:text-primary-variant"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditStudent(student)}
                      className="text-accent hover:text-accent/80"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteStudent(student)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};