import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { Student } from "@/types/student";
import { useToast } from "@/hooks/use-toast";

interface StudentFormProps {
  student?: Student;
  onSave: (student: Omit<Student, 'id'>) => void;
  onCancel: () => void;
}

export const StudentForm = ({ student, onSave, onCancel }: StudentFormProps) => {
  const [formData, setFormData] = useState({
    nis: student?.nis || "",
    name: student?.name || "",
    email: student?.email || "",
    phone: student?.phone || "",
    address: student?.address || "",
    birthDate: student?.birthDate || "",
    class: student?.class || "",
    averageGrade: student?.averageGrade || 0,
    status: student?.status || "active" as const,
    enrollmentDate: student?.enrollmentDate || new Date().toISOString().split('T')[0],
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nis || !formData.name || !formData.email || !formData.class) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field yang wajib diisi",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      onSave(formData);
      setIsLoading(false);
      toast({
        title: "Berhasil",
        description: `Data siswa ${student ? 'diperbarui' : 'ditambahkan'} successfully`,
      });
    }, 1000);
  };

  const classes = [
    "X-1 IPA", "X-2 IPA", "X-3 IPA", "X-1 IPS", "X-2 IPS", "X-3 IPS",
    "XI-1 IPA", "XI-2 IPA", "XI-3 IPA", "XI-1 IPS", "XI-2 IPS", "XI-3 IPS",
    "XII-1 IPA", "XII-2 IPA", "XII-3 IPA", "XII-1 IPS", "XII-2 IPS", "XII-3 IPS"
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onCancel} className="text-primary hover:text-primary-variant">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
        <h1 className="text-2xl font-bold text-foreground">
          {student ? 'Edit Siswa' : 'Tambah Siswa'}
        </h1>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Informasi Siswa</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nis">NIS *</Label>
                <Input
                  id="nis"
                  value={formData.nis}
                  onChange={(e) => handleChange('nis', e.target.value)}
                  placeholder="Nomor Induk Siswa"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Nama lengkap siswa"
                  className="h-11"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="email@example.com"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">No. Telepon</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className="h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Alamat</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Alamat lengkap siswa"
                className="h-11"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="birthDate">Tanggal Lahir</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleChange('birthDate', e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="class">Kelas *</Label>
                <Select value={formData.class} onValueChange={(value) => handleChange('class', value)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Pilih kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="averageGrade">Rata-rata Nilai</Label>
                <Input
                  id="averageGrade"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.averageGrade}
                  onChange={(e) => handleChange('averageGrade', parseFloat(e.target.value) || 0)}
                  placeholder="0.0"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="inactive">Non-Aktif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="enrollmentDate">Tanggal Masuk</Label>
              <Input
                id="enrollmentDate"
                type="date"
                value={formData.enrollmentDate}
                onChange={(e) => handleChange('enrollmentDate', e.target.value)}
                className="h-11"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                Batal
              </Button>
              <Button type="submit" disabled={isLoading} className="flex-1 bg-gradient-primary hover:opacity-90">
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};