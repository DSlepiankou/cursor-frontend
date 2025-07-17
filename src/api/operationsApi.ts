import axios from 'axios';
import type { PurchaseOperation } from '../types/models';

const API_BASE = 'http://localhost:5226/api/v1/PurchaseOperations';

export const fetchOperationsByUser = async (userId: number): Promise<PurchaseOperation[]> => {
  const { data } = await axios.get<PurchaseOperation[]>(`${API_BASE}/user/${userId}`);
  return data;
};

export const fetchOperationDetails = async (operationId: number): Promise<PurchaseOperation> => {
  const { data } = await axios.get<PurchaseOperation>(`${API_BASE}/${operationId}`);
  return data;
}; 