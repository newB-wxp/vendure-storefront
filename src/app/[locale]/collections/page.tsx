import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CollectionGrid } from '@/components/commerce/collection-grid';
import { getRouteLocale } from '@/i18n/server';
import { getTranslations } from 'next-intl/server';
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link } from '@/i18n/navigation';
import { SITE_NAME, buildCanonicalUrl } from '@/lib/metadata';
import { routing } from '@/i18n/routing';
import { toOgLocale } from '@/i18n/locale-utils';

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getRouteLocale();
    const t = await getTranslations({ locale, namespace: 'Home' });
    const ogLocale = toOgLocale(locale);

    return {
        title: t('allCollections'),
        description: t('allCollectionsDescription'),
        alternates: {
            canonical: buildCanonicalUrl(`/${locale}/collections`),
            languages: Object.fromEntries(
                routing.locales.map((l) => [l, buildCanonicalUrl(`/${l}/collections`)])
            ),
        },
        openGraph: {
            title: `${t('allCollections')} | ${SITE_NAME}`,
            description: t('allCollectionsDescription'),
            type: 'website',
            locale: ogLocale,
            url: buildCanonicalUrl(`/${locale}/collections`),
        },
    };
}

export default async function CollectionsPage() {
    const locale = await getRouteLocale();
    const t = await getTranslations({ locale, namespace: 'Home' });

    return (
        <div className="container mx-auto px-4 py-8 mt-16">
            <Breadcrumb className="mb-6">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink render={<Link href="/" />}>{t('home')}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{t('allCollections')}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">{t('allCollections')}</h1>
            </div>

            <Suspense fallback={<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="aspect-square bg-muted animate-pulse rounded-xl" />
                ))}
            </div>}>
                <CollectionGrid columns={3} />
            </Suspense>
        </div>
    );
}
