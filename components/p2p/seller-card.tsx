import Image from "next/image";
import { getSellerById } from 'lib/demo/sellers';

export default function SellerCard({ sellerId }: { sellerId: string }) {
  const s = getSellerById(sellerId);
  
  if (!s) {
    return null;
  }

  return (
    <div className="mt-6 rounded-2xl border-2 border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900">
      <div className="mb-4 flex items-center gap-3">
        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full border-2 border-blue-500 dark:border-blue-400">
          <Image src={s.avatar} alt={s.name} fill sizes="56px" className="object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-base font-bold text-neutral-900 dark:text-white">{s.name}</div>
          <div className="mt-1 flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <span className="truncate font-medium">{s.location}</span>
            <span>·</span>
            <span className="flex items-center gap-0.5 font-semibold text-yellow-500">
              ★ {s.rating}
            </span>
            <span className="text-neutral-500">({s.reviews})</span>
          </div>
        </div>
        <span className="flex-shrink-0 rounded-full border-2 border-green-500 bg-green-50 px-3 py-1 text-xs font-bold text-green-700 dark:border-green-400 dark:bg-green-900/30 dark:text-green-400">
          ✓ Verified
        </span>
      </div>

      <div className="mb-4 space-y-2 border-t border-neutral-200 pt-4 dark:border-neutral-700">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-600 dark:text-neutral-400">Member since:</span>
          <span className="font-semibold text-neutral-900 dark:text-white">{s.memberSince}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-600 dark:text-neutral-400">Completed deals:</span>
          <span className="font-semibold text-neutral-900 dark:text-white">{s.completedDeals}</span>
        </div>
        <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-700">
          <div className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Pickup Address:</div>
          <div className="text-sm font-semibold text-neutral-900 dark:text-white">{s.address}</div>
        </div>
      </div>

      {/* Contact Information */}
      {s.phone && (
        <div className="space-y-2.5 border-t border-neutral-200 pt-4 dark:border-neutral-700">
          <div className="text-sm font-bold text-neutral-900 dark:text-white">Contact Information:</div>
          <a
            href={`tel:${s.phone}`}
            className="flex items-center gap-2.5 rounded-lg bg-white px-3 py-2.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700 dark:bg-neutral-800 dark:text-blue-400 dark:hover:bg-neutral-700"
          >
            <span className="text-lg">📞</span>
            <span>{s.phone}</span>
          </a>
        </div>
      )}
    </div>
  );
}
