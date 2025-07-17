import React, { useState } from 'react';
import { useOperationsStore } from '../store/operationsStore.ts';
import { fetchOperationsByUser, fetchOperationDetails } from '../api/operationsApi.ts';
import type { PurchaseOperation } from '../types/models';

const OperationsPage: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { operations, setOperations, selectedOperation, setSelectedOperation } = useOperationsStore();

  const handleFetchOperations = async () => {
    setError('');
    setSelectedOperation(null);
    setLoading(true);
    try {
      const ops = await fetchOperationsByUser(Number(userId));
      setOperations(ops);
      console.log(ops);
      if (ops.length === 0) setError('No operations found for this user.');
    } catch (err) {
      setError('Failed to fetch operations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOperationClick = async (operation: PurchaseOperation) => {
    setLoading(true);
    try {
      const details = await fetchOperationDetails(operation.id);
      setSelectedOperation(details);
    } catch (err) {
      setError('Failed to fetch operation details.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, operation: PurchaseOperation) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOperationClick(operation);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Purchase Operations</h2>
        <div className="flex gap-4 items-end">
          <div>
            <label htmlFor="userId" className="block text-sm font-medium mb-2">
              User ID
            </label>
            <input
              id="userId"
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter user ID"
            />
          </div>
          <button
            onClick={handleFetchOperations}
            disabled={loading || !userId}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Fetch Operations'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Operations List</h3>
          {operations.length > 0 ? (
            <div className="space-y-2">
              {operations.map((operation) => (
                <div
                  key={operation.id}
                  onClick={() => handleOperationClick(operation)}
                  onKeyDown={(e) => handleKeyDown(e, operation)}
                  className="border border-gray-200 rounded p-4 cursor-pointer hover:bg-gray-50 focus:bg-gray-50 outline-none"
                  tabIndex={0}
                  role="button"
                  aria-label={`View details for operation ${operation.id}`}
                >
                  <div className="font-medium">{operation.description}</div>
                  <div className="text-sm text-gray-600">
                    Amount: ${operation.amount} | Status: {operation.status}
                  </div>
                  <div className="text-sm text-gray-500">
                    Date: {new Date(operation.operationDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No operations to display.</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Operation Details</h3>
          {selectedOperation ? (
            <div className="border border-gray-200 rounded p-4">
              <h4 className="font-bold text-lg mb-3">{selectedOperation.description}</h4>
              <div className="space-y-2">
                <div><strong>ID:</strong> {selectedOperation.id}</div>
                <div><strong>User:</strong> {selectedOperation.user.username}</div>
                <div><strong>Email:</strong> {selectedOperation.user.email}</div>
                <div><strong>Amount:</strong> ${selectedOperation.amount}</div>
                <div><strong>Status:</strong> {selectedOperation.status}</div>
                <div><strong>Date:</strong> {new Date(selectedOperation.operationDate).toLocaleString()}</div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Select an operation to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OperationsPage; 