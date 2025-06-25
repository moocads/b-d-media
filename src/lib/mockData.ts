/**
 * Mock data for development and testing
 */

export const mockClients = [
    {
        id: 1,
        name: 'Boston Gear',
        logo: {
            data: {
                id: 1,
                attributes: {
                    name: 'boston-gear.png',
                    alternativeText: 'Boston Gear logo',
                    url: '/images/clients/boston-gear.png',
                    width: 120,
                    height: 80,
                    formats: {
                        thumbnail: { url: '/images/clients/boston-gear.png' },
                        small: { url: '/images/clients/boston-gear.png' },
                        medium: { url: '/images/clients/boston-gear.png' },
                        large: { url: '/images/clients/boston-gear.png' }
                    }
                }
            }
        },
        website: 'https://example.com',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z'
    },
    {
        id: 2,
        name: 'Microsoft',
        logo: {
            data: {
                id: 2,
                attributes: {
                    name: 'microsoft.png',
                    alternativeText: 'Microsoft logo',
                    url: '/images/clients/microsoft.png',
                    width: 120,
                    height: 80,
                    formats: {
                        thumbnail: { url: '/images/clients/microsoft.png' },
                        small: { url: '/images/clients/microsoft.png' },
                        medium: { url: '/images/clients/microsoft.png' },
                        large: { url: '/images/clients/microsoft.png' }
                    }
                }
            }
        },
        website: 'https://microsoft.com',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z'
    },
    {
        id: 3,
        name: 'HP',
        logo: {
            data: {
                id: 3,
                attributes: {
                    name: 'hp.png',
                    alternativeText: 'HP logo',
                    url: '/images/clients/hp.png',
                    width: 120,
                    height: 80,
                    formats: {
                        thumbnail: { url: '/images/clients/hp.png' },
                        small: { url: '/images/clients/hp.png' },
                        medium: { url: '/images/clients/hp.png' },
                        large: { url: '/images/clients/hp.png' }
                    }
                }
            }
        },
        website: 'https://hp.com',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z'
    },
    {
        id: 4,
        name: 'Huawei',
        logo: {
            data: {
                id: 4,
                attributes: {
                    name: 'huawei.png',
                    alternativeText: 'Huawei logo',
                    url: '/images/clients/huawei.png',
                    width: 120,
                    height: 80,
                    formats: {
                        thumbnail: { url: '/images/clients/huawei.png' },
                        small: { url: '/images/clients/huawei.png' },
                        medium: { url: '/images/clients/huawei.png' },
                        large: { url: '/images/clients/huawei.png' }
                    }
                }
            }
        },
        website: 'https://huawei.com',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z'
    },
    {
        id: 5,
        name: 'Lenovo',
        logo: {
            data: {
                id: 5,
                attributes: {
                    name: 'lenovo.png',
                    alternativeText: 'Lenovo logo',
                    url: '/images/clients/lenovo.png',
                    width: 120,
                    height: 80,
                    formats: {
                        thumbnail: { url: '/images/clients/lenovo.png' },
                        small: { url: '/images/clients/lenovo.png' },
                        medium: { url: '/images/clients/lenovo.png' },
                        large: { url: '/images/clients/lenovo.png' }
                    }
                }
            }
        },
        website: 'https://lenovo.com',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z'
    }
];

export const mockNews = [
    {
        id: 1,
        title: 'This is a title for this news...',
        slug: 'news-1',
        summary: 'Summary of the first news article',
        content: 'Content of the first news article',
        publishedAt: '2025-06-01T00:00:00.000Z',
        createdAt: '2025-06-01T00:00:00.000Z',
        updatedAt: '2025-06-01T00:00:00.000Z',
        coverImage: {
            data: {
                id: 1,
                attributes: {
                    name: 'news-1.jpg',
                    alternativeText: 'News 1 cover image',
                    url: '/images/news/news-1.jpg',
                    width: 800,
                    height: 600,
                    formats: {
                        thumbnail: { url: '/images/news/news-1.jpg' },
                        small: { url: '/images/news/news-1.jpg' },
                        medium: { url: '/images/news/news-1.jpg' },
                        large: { url: '/images/news/news-1.jpg' }
                    }
                }
            }
        }
    },
    {
        id: 2,
        title: 'This is a title for this news...',
        slug: 'news-2',
        summary: 'Summary of the second news article',
        content: 'Content of the second news article',
        publishedAt: '2025-05-15T00:00:00.000Z',
        createdAt: '2025-05-15T00:00:00.000Z',
        updatedAt: '2025-05-15T00:00:00.000Z',
        coverImage: {
            data: {
                id: 2,
                attributes: {
                    name: 'news-2.jpg',
                    alternativeText: 'News 2 cover image',
                    url: '/images/news/news-2.jpg',
                    width: 800,
                    height: 600,
                    formats: {
                        thumbnail: { url: '/images/news/news-2.jpg' },
                        small: { url: '/images/news/news-2.jpg' },
                        medium: { url: '/images/news/news-2.jpg' },
                        large: { url: '/images/news/news-2.jpg' }
                    }
                }
            }
        }
    },
    {
        id: 3,
        title: 'This is a title for this news...',
        slug: 'news-3',
        summary: 'Summary of the third news article',
        content: 'Content of the third news article',
        publishedAt: '2025-05-01T00:00:00.000Z',
        createdAt: '2025-05-01T00:00:00.000Z',
        updatedAt: '2025-05-01T00:00:00.000Z',
        coverImage: {
            data: {
                id: 3,
                attributes: {
                    name: 'news-3.jpg',
                    alternativeText: 'News 3 cover image',
                    url: '/images/news/news-3.jpg',
                    width: 800,
                    height: 600,
                    formats: {
                        thumbnail: { url: '/images/news/news-3.jpg' },
                        small: { url: '/images/news/news-3.jpg' },
                        medium: { url: '/images/news/news-3.jpg' },
                        large: { url: '/images/news/news-3.jpg' }
                    }
                }
            }
        }
    }
];

export const mockServices = [
    {
        id: 1,
        title: 'Brand Strategy',
        description: 'Comprehensive brand strategy services',
        icon: {
            id: 1,
            name: 'brand-strategy.jpg',
            alternativeText: 'Brand Strategy icon',
            url: '/images/services/brand-strategy.jpg',
            width: 400,
            height: 300,
            formats: {
                thumbnail: { url: '/images/services/brand-strategy.jpg' },
                small: { url: '/images/services/brand-strategy.jpg' },
                medium: { url: '/images/services/brand-strategy.jpg' },
                large: { url: '/images/services/brand-strategy.jpg' }
            }
        },
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z'
    },
    {
        id: 2,
        title: 'Digital Marketing',
        description: 'Effective digital marketing solutions',
        icon: {
            id: 2,
            name: 'digital-marketing.jpg',
            alternativeText: 'Digital Marketing icon',
            url: '/images/services/digital-marketing.jpg',
            width: 400,
            height: 300,
            formats: {
                thumbnail: { url: '/images/services/digital-marketing.jpg' },
                small: { url: '/images/services/digital-marketing.jpg' },
                medium: { url: '/images/services/digital-marketing.jpg' },
                large: { url: '/images/services/digital-marketing.jpg' }
            }
        },
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z'
    },
    {
        id: 3,
        title: 'Production',
        description: 'High-quality production services',
        icon: {
            id: 3,
            name: 'production.jpg',
            alternativeText: 'Production icon',
            url: '/images/services/production.jpg',
            width: 400,
            height: 300,
            formats: {
                thumbnail: { url: '/images/services/production.jpg' },
                small: { url: '/images/services/production.jpg' },
                medium: { url: '/images/services/production.jpg' },
                large: { url: '/images/services/production.jpg' }
            }
        },
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z'
    }
];
