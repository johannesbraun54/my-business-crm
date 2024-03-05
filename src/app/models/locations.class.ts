export class Location {

    position!: { lat: number, lng: number };
    title!: string;
    content!: {
        name: string;
        adress: string;
        street: string;
        customUserId: string;
    }

    constructor(obj?: any) {
        this.position = obj ? { lat: obj.lat, lng: obj.lng } : { lat: 0, lng: 0 };
        this.title = obj ? obj.title : '';
        this.content = obj ? {
            name: obj.name,
            adress: obj.adress,
            street: obj.street,
            customUserId: obj.customUserId,
        } : {
            name: '',
            adress: '',
            street: '',
            customUserId: '',
        }
    }

}