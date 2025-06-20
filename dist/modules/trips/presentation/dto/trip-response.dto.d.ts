export declare class TripResponseDto {
    id: string;
    driverId: string;
    passengerId: string;
    status: string;
    originLat: number;
    originLong: number;
    destLat: number;
    destLong: number;
    fare: number;
    requestedAt: Date;
    startedAt?: Date;
    finishedAt?: Date;
    driver?: {
        id: string;
        fullName: string;
        phone: string;
    };
    passenger?: {
        id: string;
        fullName: string;
        phone: string;
    };
    invoice?: {
        id: string;
        total: number;
    };
}
