import RequestService from "./request-service";
import {Ticket} from "@acme/shared-models";

class TicketService extends RequestService {
    public async getAllTickets(): Promise<Ticket[]> {
        return await this.sendGet('/api/tickets');
    }

    public async getTicket(id: any): Promise<Ticket> {
        return await this.sendGet('/api/tickets/' + id);
    }

    public async addTicket(body: any) {
        return await this.sendPost('/api/tickets', body);
    }

    public async markComplete(id: any) {
        return await this.sendPut('/api/tickets/' + id + '/complete', {});
    }

    public async markIncomplete(id: any) {
        return await this.sendDelete('/api/tickets/' + id + '/complete', {});
    }

    public async assignUserToTicket(ticketId: any, userId: any) {
        return await this.sendPut('/api/tickets/' + ticketId + '/assign/' + userId, {});
    }

    public async unAssignUserToTicket(ticketId: any) {
        return await this.sendPut('/api/tickets/' + ticketId + '/unassign', {});
    }
}

export default TicketService;
