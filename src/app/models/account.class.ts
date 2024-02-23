export class Account {
    firstName: string;
    lastName: string;
    email: string; 
    password: string;

    constructor(obj?:any){
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.email = obj ? obj.email : '';
        this.password = obj? obj.password : '';
    }

    public toJson(){
        return {
            firstName : this.firstName,
            lastName : this.lastName,
            email : this.email,
            password : this.password
        }
    }
}