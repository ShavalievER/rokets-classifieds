import type { Metadata } from 'next';
import { Suspense } from 'react';

import Prose from 'components/prose';
import { getPage } from 'lib/shopify';
import { notFound } from 'next/navigation';

export async function generateMetadata(props: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = await getPage(params.page);

  if (!page) return notFound();

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.bodySummary,
    openGraph: {
      publishedTime: page.createdAt,
      modifiedTime: page.updatedAt,
      type: 'article'
    }
  };
}

async function PageContent({ pageHandle }: { pageHandle: string }) {
  const page = await getPage(pageHandle);

  if (!page) return notFound();

  // Use static date format to avoid Date() during prerender
  const updatedDate = page.updatedAt ? new Date(page.updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';

  return (
    <>
      <h1 className="mb-8 text-5xl font-bold">{page.title}</h1>
      <Prose className="mb-8" html={page.body} />
      {updatedDate && (
        <p className="text-sm italic">
          {`This document was last updated on ${updatedDate}.`}
        </p>
      )}
    </>
  );
}

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const params = await props.params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent pageHandle={params.page} />
    </Suspense>
  );
}
