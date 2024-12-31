

interface User {
  id: String;
  email: string;
  name: string;
  lastConsultation: FirebaseFirestore.Timestamp;
  newsletter:boolean;
}


interface Consults {
  id: string;
  userId: string;
  date: FirebaseFirestore.Timestamp;
  data: {
    cards: [],
    interpretation: string
  }
}