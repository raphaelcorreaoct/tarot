
import cards from "@/data";

export interface User {
  id: string;
  email: string;
  name: string;
  lastConsultation: FirebaseFirestore.Timestamp;
  newsletter:boolean;
}


export interface Consults {
  id: User['id'];
  userId: string;
  date: FirebaseFirestore.Timestamp;
  gameEnd?: boolean;
  paymentAccept: boolean;
  data: {
    cards: typeof cards,
    interpretation: string
  }
}