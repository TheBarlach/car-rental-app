export type MapCar = {
    id: string;
    name: string;
    locationName: string;
    image?: string;
    latitude: number;
    longitude: number;
    isAvailable: boolean;
    specifications: {
        brandModel: string;
        year: number;
        kilometer: number;
        fuelType: string;
        gearbox: string;
        price: number;
        registrationNumber: string;
    };
};