import { query } from '@/lib/vendure/api';
import { GetAllCollectionsQuery } from '@/lib/vendure/queries';
import { CollectionCard } from './collection-card';
import { getRouteLocale } from '@/i18n/server';
import { cacheLife, cacheTag } from 'next/cache';

async function getAllCollections() {
    'use cache';
    cacheLife('days');

    const locale = await getRouteLocale();
    cacheTag(`all-collections-${locale}`);

    const result = await query(GetAllCollectionsQuery, undefined, { languageCode: locale });
    return result.data.collections.items;
}

interface CollectionGridProps {
    title?: string;
    columns?: number;
}

export async function CollectionGrid({ title, columns = 3 }: CollectionGridProps) {
    const collections = await getAllCollections();

    if (!collections.length) {
        return null;
    }

    const gridCols = columns === 4
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

    return (
        <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
                {title && (
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">{title}</h2>
                )}
                <div className={`grid ${gridCols} gap-6`}>
                    {collections.map((collection) => (
                        <CollectionCard key={collection.id} collection={collection} />
                    ))}
                </div>
            </div>
        </section>
    );
}
