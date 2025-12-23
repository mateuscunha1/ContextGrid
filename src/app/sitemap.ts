import { MetadataRoute } from 'next';
import { getAllReviews } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const reviews = await getAllReviews();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://contextgrid.vercel.app';

    const reviewUrls = reviews.map((review) => ({
        url: `${baseUrl}/reviews/${review.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/reviews`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/ofertas`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/sobre`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        ...reviewUrls,
    ];
}
