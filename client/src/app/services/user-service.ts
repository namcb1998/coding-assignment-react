import RequestService from "./request-service";
import {Ticket, User} from "@acme/shared-models";

export class UserService extends RequestService{
    public async getAllUsers(): Promise<User[]> {
        return await this.sendGet('/api/users');
    }

    public async getUser(id: any): Promise<User> {
        return await this.sendGet('/api/users/' + id);
    }
}

