'use client';

import { useState, useTransition, useEffect } from 'react';
import { DeliveryAddress } from 'lib/demo/user';
import { toast } from 'sonner';
import {
  fetchAddresses,
  createAddress,
  updateAddress,
  removeAddress,
  setDefaultAddress
} from 'lib/demo/client-api';

export default function DeliveryAddresses() {
  const [addresses, setAddresses] = useState<DeliveryAddress[]>([]);
  const [isPending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      const data = await fetchAddresses();
      setAddresses(data);
    } catch (error) {
      console.error('Failed to load addresses:', error);
      toast.error('Failed to load addresses');
    }
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newAddress: Omit<DeliveryAddress, 'id'> = {
      label: formData.get('label') as string,
      fullName: formData.get('fullName') as string,
      phone: formData.get('phone') as string,
      addressLine1: formData.get('addressLine1') as string,
      addressLine2: formData.get('addressLine2') as string || undefined,
      city: formData.get('city') as string,
      state: formData.get('state') as string || undefined,
      postalCode: formData.get('postalCode') as string,
      country: formData.get('country') as string,
      isDefault: formData.get('isDefault') === 'on'
    };

    startTransition(async () => {
      try {
        await createAddress(newAddress);
        await loadAddresses();
        setShowAddForm(false);
        toast.success('Address added successfully');
      } catch (error) {
        console.error('Error adding address:', error);
        toast.error('Failed to add address');
      }
    });
  };

  const handleEdit = async (id: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const updates: Partial<DeliveryAddress> = {
      label: formData.get('label') as string,
      fullName: formData.get('fullName') as string,
      phone: formData.get('phone') as string,
      addressLine1: formData.get('addressLine1') as string,
      addressLine2: formData.get('addressLine2') as string || undefined,
      city: formData.get('city') as string,
      state: formData.get('state') as string || undefined,
      postalCode: formData.get('postalCode') as string,
      country: formData.get('country') as string,
      isDefault: formData.get('isDefault') === 'on'
    };

    startTransition(async () => {
      try {
        const result = await updateAddress(id, updates);
        if (result) {
          await loadAddresses();
          setEditingId(null);
          toast.success('Address updated successfully');
        } else {
          toast.error('Failed to update address');
        }
      } catch (error) {
        console.error('Error updating address:', error);
        toast.error('An error occurred');
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this address?')) return;

    startTransition(async () => {
      try {
        const success = await removeAddress(id);
        if (success) {
          await loadAddresses();
          toast.success('Address deleted successfully');
        } else {
          toast.error('Failed to delete address');
        }
      } catch (error) {
        console.error('Error deleting address:', error);
        toast.error('An error occurred');
      }
    });
  };

  const handleSetDefault = async (id: string) => {
    startTransition(async () => {
      try {
        const success = await setDefaultAddress(id);
        if (success) {
          await loadAddresses();
          toast.success('Default address updated');
        } else {
          toast.error('Failed to set default address');
        }
      } catch (error) {
        console.error('Error setting default address:', error);
        toast.error('An error occurred');
      }
    });
  };

  return (
    <section id="addresses" className="scroll-mt-8">
      <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-black">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Delivery Addresses</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {showAddForm ? 'Cancel' : '+ Add Address'}
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleAdd} className="mb-6 space-y-4 rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h3 className="font-medium">Add New Address</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium">Label (Home, Work, etc.)</label>
                <input type="text" name="label" required className="mt-1 block w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input type="text" name="fullName" required className="mt-1 block w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Phone</label>
                <input type="tel" name="phone" required className="mt-1 block w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Country</label>
                <input type="text" name="country" required className="mt-1 block w-full rounded-md border px-3 py-2" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium">Address Line 1</label>
                <input type="text" name="addressLine1" required className="mt-1 block w-full rounded-md border px-3 py-2" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium">Address Line 2 (Optional)</label>
                <input type="text" name="addressLine2" className="mt-1 block w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">City</label>
                <input type="text" name="city" required className="mt-1 block w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">State/Province</label>
                <input type="text" name="state" className="mt-1 block w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Postal Code</label>
                <input type="text" name="postalCode" required className="mt-1 block w-full rounded-md border px-3 py-2" />
              </div>
              <div className="flex items-center">
                <input type="checkbox" name="isDefault" id="new-isDefault" className="mr-2" />
                <label htmlFor="new-isDefault" className="text-sm">Set as default address</label>
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
                {isPending ? 'Adding...' : 'Add Address'}
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {addresses.length === 0 ? (
            <p className="text-sm text-neutral-500">No addresses saved yet.</p>
          ) : (
            addresses.map((address) => (
              <div
                key={address.id}
                className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700"
              >
                {editingId === address.id ? (
                  <form onSubmit={(e) => handleEdit(address.id, e)} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium">Label</label>
                        <input type="text" name="label" defaultValue={address.label} required className="mt-1 block w-full rounded-md border px-3 py-2" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Full Name</label>
                        <input type="text" name="fullName" defaultValue={address.fullName} required className="mt-1 block w-full rounded-md border px-3 py-2" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Phone</label>
                        <input type="tel" name="phone" defaultValue={address.phone} required className="mt-1 block w-full rounded-md border px-3 py-2" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Country</label>
                        <input type="text" name="country" defaultValue={address.country} required className="mt-1 block w-full rounded-md border px-3 py-2" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium">Address Line 1</label>
                        <input type="text" name="addressLine1" defaultValue={address.addressLine1} required className="mt-1 block w-full rounded-md border px-3 py-2" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium">Address Line 2</label>
                        <input type="text" name="addressLine2" defaultValue={address.addressLine2} className="mt-1 block w-full rounded-md border px-3 py-2" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">City</label>
                        <input type="text" name="city" defaultValue={address.city} required className="mt-1 block w-full rounded-md border px-3 py-2" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">State</label>
                        <input type="text" name="state" defaultValue={address.state} className="mt-1 block w-full rounded-md border px-3 py-2" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Postal Code</label>
                        <input type="text" name="postalCode" defaultValue={address.postalCode} required className="mt-1 block w-full rounded-md border px-3 py-2" />
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" name="isDefault" id={`isDefault-${address.id}`} defaultChecked={address.isDefault} className="mr-2" />
                        <label htmlFor={`isDefault-${address.id}`} className="text-sm">Set as default</label>
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
                          <h3 className="font-medium">{address.label}</h3>
                          {address.isDefault && (
                            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                          {address.fullName}
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {address.phone}
                        </p>
                        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                          {address.addressLine1}
                          {address.addressLine2 && `, ${address.addressLine2}`}
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {address.city}
                          {address.state && `, ${address.state}`} {address.postalCode}
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">{address.country}</p>
                      </div>
                      <div className="ml-4 flex flex-col gap-2">
                        {!address.isDefault && (
                          <button
                            onClick={() => handleSetDefault(address.id)}
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Set Default
                          </button>
                        )}
                        <button
                          onClick={() => setEditingId(address.id)}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(address.id)}
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

