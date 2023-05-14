import {useRef, useState} from "react";
import TicketService from "../../services/ticket-service";
import {Ticket} from "@acme/shared-models";

/* eslint-disable-next-line */
export interface StatusSelectionProps {
    ticket: Ticket;
    onSuccessUpdateStatus: any;
}

export function StatusSelection(props: StatusSelectionProps) {
    const selectRef = useRef<HTMLSelectElement>(null);
    const [loadingStatus, setLoadingStatus] = useState(false);


    function handleUpdateStatus(event: any) {
        const completed = event.target.value === 'true';
        setLoadingStatus(true);
        const ticketService = new TicketService();
        const changeStatusPromise = completed ? ticketService.markComplete(props.ticket.id) : ticketService.markIncomplete(props.ticket.id);
        changeStatusPromise.then(() => {
            props.onSuccessUpdateStatus(completed);
            setLoadingStatus(false);
        }).catch((e) => {
            selectRef.current!.value = String(!completed);
            setLoadingStatus(false);
            alert(e.message);
        });
    }

    return (
        <select ref={selectRef} disabled={loadingStatus} style={{marginLeft: "10px"}} name="filter-ticket"
                defaultValue={String(props.ticket?.completed)} onChange={handleUpdateStatus}>
            <option value="true">Completed</option>
            <option value="false">Incomplete</option>
        </select>
    );
}

export default StatusSelection;
