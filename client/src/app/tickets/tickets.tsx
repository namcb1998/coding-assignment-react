import {Ticket} from '@acme/shared-models';
import FilterableTicketList from "../components/filterable-ticket-list/filterable-ticket-list";
import {useEffect, useState} from "react";
import AddTicketBar from "../components/add-ticket-bar/add-ticket-bar";
import TicketService from "../services/ticket-service";


export function Tickets() {
    const [tickets, setTickets] = useState([] as Ticket[]);
    const [dataStatus, setDataStatus] = useState('loading');
    const [filterOption, setFilterOption] = useState('none');

    useEffect(  () => {
        fetchTickets();
    }, []);

    function fetchTickets() {
        const ticketService = new TicketService();
        ticketService.getAllTickets().then((tickets) => {
            setTickets(tickets);
            setDataStatus("done");
        }).catch((e)=> {
            setDataStatus("done");
            alert(e.message);
        });
    }


    function onSuccessAddTicket (ticket: Ticket) {
        const newArr = [...tickets];
        newArr.push(ticket);
        setTickets(newArr);
    }
    function onFilterTicket (option: string) {
        setFilterOption(option);
    }


    return (
        <div style={{width: "700px", height: "400px"}}>
            <div style={{height: "400px"}}>
                <FilterableTicketList dataStatus={dataStatus} filterOption={filterOption} onFilterTicket={onFilterTicket} tickets={tickets}/>
            </div>
            <div style={{marginTop: "20px"}}>
                <div style={{textAlign: 'center'}}>
                    <AddTicketBar onSuccessAddTicket = {onSuccessAddTicket} />
                </div>
            </div>
        </div>
    );
}

export default Tickets;
