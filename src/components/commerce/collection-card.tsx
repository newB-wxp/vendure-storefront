import Image from 'next/image';
import { Link } from '@/i18n/navigation';

interface CollectionCardProps {
    collection: {
        id: string;
        name: string;
        slug: string;
        description?: string | null;
        featuredAsset?: {
            id: string;
            preview: string;
        } | null;
    };
}

export function CollectionCard({ collection }: CollectionCardProps) {
    return (
        <Link
            href={`/collection/${collection.slug}`}
            className="group block bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
            <div className="aspect-square relative bg-muted overflow-hidden">
                {collection.featuredAsset ? (
                    <Image
                        src={collection.featuredAsset.preview}
                        alt={collection.name}
                        fill
                        className="object-cover group-hover:scale-105 group-hover:opacity-90 transition-all duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <span className="text-4xl font-bold opacity-20">
                            {collection.name.charAt(0)}
                        </span>
                    </div>
                )}
            </div>
            <div className="p-4 space-y-2">
                <h3 className="font-medium leading-snug line-clamp-1 group-hover:text-primary transition-colors">
                    {collection.name}
                </h3>
                {collection.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {collection.description}
                    </p>
                )}
            </div>
        </Link>
    );
}
