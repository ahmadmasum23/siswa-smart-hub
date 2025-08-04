import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, MapPin, Calendar, Mail, Phone, User } from "lucide-react";
import { Student } from "@/types/student";

interface StudentDetailProps {
  student: Student;
  onBack: () => void;
  onEdit: (student: Student) => void;
}

export const StudentDetail = ({ student, onBack, onEdit }: StudentDetailProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="text-primary hover:text-primary-variant">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
        <Button onClick={() => onEdit(student)} className="bg-gradient-primary hover:opacity-90">
          <Edit className="h-4 w-4 mr-2" />
          Edit Data
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <User className="h-5 w-5 text-primary" />
                Informasi Siswa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">NIS</label>
                  <p className="text-lg font-semibold text-foreground">{student.nis}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nama Lengkap</label>
                  <p className="text-lg font-semibold text-foreground">{student.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Kelas</label>
                  <Badge variant="secondary" className="text-sm">{student.class}</Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Tanggal Lahir</label>
                  <p className="text-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {new Date(student.birthDate).toLocaleDateString('id-ID')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                Kontak & Alamat
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {student.email}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">No. Telepon</label>
                <p className="text-foreground flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {student.phone}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Alamat</label>
                <p className="text-foreground flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                  {student.address}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Informasi Akademik</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Rata-rata Nilai</label>
                <p className="text-2xl font-bold text-primary">{student.averageGrade}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <Badge variant={student.status === 'bekerja' ? 'default' : 'secondary'}>
                  {student.status === 'bekerja' ? 'bekerja' : 'tidakbekerja'}
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Tanggal Masuk</label>
                <p className="text-foreground">{new Date(student.enrollmentDate).toLocaleDateString('id-ID')}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Prestasi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <p className="text-sm font-medium">Juara 1 Matematika</p>
                  <p className="text-xs text-muted-foreground">Olimpiade Sekolah 2024</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <p className="text-sm font-medium">Siswa Teladan</p>
                  <p className="text-xs text-muted-foreground">Semester Genap 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};