import Link from 'next/link';
import Footer from 'components/layout/footer';
import { CATEGORY_STRUCTURE } from 'lib/demo/categories';

export const metadata = {
  description:
    'High-performance classifieds platform built with Next.js and Rockets Delivery.',
  openGraph: {
    type: 'website'
  }
};

export default function HomePage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">
            Browse Categories
          </h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Find what you're looking for in our classifieds
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CATEGORY_STRUCTURE.map((category) => (
            <Link
              key={category.id}
              href={`/search/${category.handle}`}
              className="group rounded-lg border border-neutral-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-900"
            >
              <h2 className="mb-3 text-xl font-semibold text-neutral-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {category.name}
              </h2>
              {category.subcategories && category.subcategories.length > 0 && (
                <ul className="space-y-1">
                  {category.subcategories.slice(0, 4).map((sub) => (
                    <li
                      key={sub.id}
                      className="text-sm text-neutral-600 dark:text-neutral-400"
                    >
                      • {sub.name}
                    </li>
                  ))}
                  {category.subcategories.length > 4 && (
                    <li className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      +{category.subcategories.length - 4} more
                    </li>
                  )}
                </ul>
              )}
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
