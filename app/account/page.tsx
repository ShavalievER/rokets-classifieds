import { Metadata } from 'next';
import { getDemoUser } from 'lib/demo/user';
import AccountNavigation from 'components/account/navigation';
import ProfileSettings from 'components/account/profile-settings';
import DeliveryAddresses from 'components/account/delivery-addresses';
import PaymentMethods from 'components/account/payment-methods';

export const metadata: Metadata = {
  title: 'Account',
  description: 'Manage your account settings, delivery addresses, and payment methods'
};

export default async function AccountPage() {
  const user = getDemoUser();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Account</h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 lg:flex-shrink-0">
          <AccountNavigation />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <ProfileSettings user={user} />
          <div className="mt-8">
            <DeliveryAddresses />
          </div>
          <div className="mt-8">
            <PaymentMethods />
          </div>
        </div>
      </div>
    </div>
  );
}

