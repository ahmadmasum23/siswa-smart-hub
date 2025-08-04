export interface Student {
  id: string;
  nis: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  class: string;
  averageGrade: number;
  status: 'bekerja' | 'tidakbekerja';
  enrollmentDate: string;
}