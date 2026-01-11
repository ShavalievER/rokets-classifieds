'use client';

import { useState, useTransition, useEffect } from 'react';
import { PaymentMethod } from 'lib/demo/user';
import { toast } from 'sonner';
import {
  fetchPaymentMethods,
  createPaymentMethod,
  updatePaymentMethod,
  removePaymentMethod,
  setDefaultPaymentMethod
} from 'lib/demo/client-api';

export default function PaymentMethods() {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [isPending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    loadMethods();
  }, []);

  const loadMethods = async () => {
    try {
      const data = await fetchPaymentMethods();
      setMethods(data);
    } catch (error) {
      console.error('Failed to load payment methods:', error);
      toast.error('Failed to load payment methods');
    }
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newMethod: Omit<PaymentMethod, 'id'> = {
      type: formData.get('type') as PaymentMethod['type'],
      label: formData.get('label') as string,
      isDefault: formData.get('isDefault') === 'on',
      expiryDate: formData.get('expiryDate') as string || undefined,
      cardholderName: formData.get('cardholderName') as string || undefined,
      brand: formData.get('brand') as string || undefined
    };

    startTransition(async () => {
      try {
        await createPaymentMethod(newMethod);
        await loadMethods();
        setShowAddForm(false);
        toast.success('Payment method added successfully');
      } catch (error) {
        console.error('Error adding payment method:', error);
        toast.error('Failed to add payment method');
      }
    });
  };

  const handleEdit = async (id: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const updates: Partial<PaymentMethod> = {
      label: formData.get('label') as string,
      expiryDate: formData.get('expiryDate') as string || undefined,
      cardholderName: formData.get('cardholderName') as string || undefined,
      brand: formData.get('brand') as string || undefined,
      isDefault: formData.get('isDefault') === 'on'
    };

    startTransition(async () => {
      try {
        const result = await updatePaymentMethod(id, updates);
        if (result) {
          await loadMethods();
          setEditingId(null);
          toast.success('Payment method updated successfully');
        } else {
          toast.error('Failed to update payment method');
        }
      } catch (error) {
        console.error('Error updating payment method:', error);
        toast.error('An error occurred');
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this payment method?')) return;

    startTransition(async () => {
      try {
        const success = await removePaymentMethod(id);
        if (success) {
          await loadMethods();
          toast.success('Payment method deleted successfully');
        } else {
          toast.error('Failed to delete payment method');
        }
      } catch (error) {
        console.error('Error deleting payment method:', error);
        toast.error('An error occurred');
      }
    });
  };

  const handleSetDefault = async (id: string) => {
    startTransition(async () => {
      try {
        const success = await setDefaultPaymentMethod(id);
        if (success) {
          await loadMethods();
          toast.success('Default payment method updated');
        } else {
          toast.error('Failed to set default payment method');
        }
      } catch (error) {
        console.error('Error setting default payment method:', error);
        toast.error('An error occurred');
      }
    });
  };

  const getCardIcon = (brand?: string) => {
    switch (brand?.toLowerCase()) {
      case 'visa':
        return '💳';
      case 'mastercard':
        return '💳';
      case 'amex':
        return '💳';
      default:
        return '💳';
    }
  };

  return (
    <section id="payments" className="scroll-mt-8">
      <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-black">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Payment Methods</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {showAddForm ? 'Cancel' : '+ Add Payment Method'}
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleAdd} className="mb-6 space-y-4 rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h3 className="font-medium">Add New Payment Method</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium">Type</label>
                <select name="type" required className="mt-1 block w-full rounded-md border px-3 py-2">
                  <option value="card">Credit/Debit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="apple_pay">Apple Pay</option>
                  <option value="google_pay">Google Pay</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Card Number (Last 4 digits)</label>
                <input type="text" name="label" placeholder="**** **** **** 1234" required className="mt-1 block w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Cardholder Name</label>
                <input type="text" name="cardholderName" className="mt-1 block w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Expiry Date (MM/YY)</label>
                <input type="text" name="expiryDate" placeholder="12/25" className="mt-1 block w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Brand</label>
                <select name="brand" className="mt-1 block w-full rounded-md border px-3 py-2">
                  <option value="">Select brand</option>
                  <option value="Visa">Visa</option>
                  <option value="Mastercard">Mastercard</option>
                  <option value="Amex">American Express</option>
                </select>
              </div>
              <div className="flex items-center">
                <input type="checkbox" name="isDefault" id="new-pm-default" className="mr-2" />
                <label htmlFor="new-pm-default" className="text-sm">Set as default payment method</label>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="rounded-md border px-4 py-2 text-sm"
              >
                Cancel
              </button>
              <button type="submit" disabled={isPending} className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50">
                {isPending ? 'Adding...' : 'Add Payment Method'}
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {methods.length === 0 ? (
            <p className="text-sm text-neutral-500">No payment methods saved yet.</p>
          ) : (
            methods.map((method) => (
              <div
                key={method.id}
                className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700"
              >
                {editingId === method.id ? (
                  <form onSubmit={(e) => handleEdit(method.id, e)} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium">Card Number (Last 4)</label>
                        <input type="text" name="label" defaultValue={method.label} required className="mt-1 block w-full rounded-md border px-3 py-2" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Cardholder Name</label>
                        <input type="text" name="cardholderName" defaultValue={method.cardholderName} className="mt-1 block w-full rounded-md border px-3 py-2" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Expiry Date</label>
                        <input type="text" name="expiryDate" defaultValue={method.expiryDate} className="mt-1 block w-full rounded-md border px-3 py-2" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Brand</label>
                        <select name="brand" defaultValue={method.brand} className="mt-1 block w-full rounded-md border px-3 py-2">
                          <option value="">Select brand</option>
                          <option value="Visa">Visa</option>
                          <option value="Mastercard">Mastercard</option>
                          <option value="Amex">American Express</option>
                        </select>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" name="isDefault" id={`pm-default-${method.id}`} defaultChecked={method.isDefault} className="mr-2" />
                        <label htmlFor={`pm-default-${method.id}`} className="text-sm">Set as default</label>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="rounded-md border px-4 py-2 text-sm"
                      >
                        Cancel
                      </button>
                      <button type="submit" disabled={isPending} className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50">
                        {isPending ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{getCardIcon(method.brand)}</span>
                          <h3 className="font-medium">
                            {method.type === 'card' ? `${method.brand || 'Card'} ${method.label}` : method.type}
                          </h3>
                          {method.isDefault && (
                            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                              Default
                            </span>
                          )}
                        </div>
                        {method.cardholderName && (
                          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                            {method.cardholderName}
                          </p>
                        )}
                        {method.expiryDate && (
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Expires {method.expiryDate}
                          </p>
                        )}
                      </div>
                      <div className="ml-4 flex flex-col gap-2">
                        {!method.isDefault && (
                          <button
                            onClick={() => handleSetDefault(method.id)}
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Set Default
                          </button>
                        )}
                        <button
                          onClick={() => setEditingId(method.id)}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(method.id)}
                          className="text-xs text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}




