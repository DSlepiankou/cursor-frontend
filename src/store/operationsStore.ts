import { create } from 'zustand';
import type { PurchaseOperation } from '../types/models';

interface OperationsState {
  operations: PurchaseOperation[];
  selectedOperation: PurchaseOperation | null;
  setOperations: (ops: PurchaseOperation[]) => void;
  setSelectedOperation: (op: PurchaseOperation | null) => void;
}

export const useOperationsStore = create<OperationsState>((set) => ({
  operations: [],
  selectedOperation: null,
  setOperations: (ops) => set({ operations: ops }),
  setSelectedOperation: (op) => set({ selectedOperation: op }),
})); 