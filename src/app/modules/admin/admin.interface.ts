
export type IAdmin = {
  id: string;
  createdAt: Date; 
  updatedAt: Date;
  firstName: string;
  lastName: string;
  address: string | null;
  verified: boolean | null;
  email: string;
  phoneNumber: number;
}

