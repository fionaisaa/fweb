export interface Team {
  _id: any;         // ID e anëtarit, zakonisht string
  name: string;        // Emri i anëtarit
  role: string;        // Roli në ekip
  description: string; // Përshkrimi
  image?: string;      // URL ose path i fotos (opsionale)
  createdAt: Date;     // Data e krijimit
}
