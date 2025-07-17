export type User = {
  id: number;
  username: string;
  email: string;
};

export type PurchaseOperation = {
  id: number;
  userId: number;
  user: User;
  operationDate: string;
  amount: number;
  description: string;
  status: string;
}; 