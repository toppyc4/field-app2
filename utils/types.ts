export type TypeOfService = 'Vacant Land' | 'Real Estate' | 'Property' | 'Service';

export type Post = {
    address: {
        coordinate: {
            lat: number;
            lng: number;
        };
        country: string;
        district: string;
        locality: string;
        province: string;
        streetAddress1: string;
        streetAddress2: string;
        zipCode: string;
    };
    content: string;
    createdAt: any;
    phone: string;
    photoUrl: string | null;
    price: string;
    published: boolean;
    slug: string;
    title: string;
    typeOfService: TypeOfService;
    uid: string;
    updateAt: any;
    username: string;
}