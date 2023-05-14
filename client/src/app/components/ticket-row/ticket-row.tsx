import {Ticket} from "@acme/shared-models";
import { useNavigate } from "react-router-dom";
export interface TicketRowProps {
    ticket: Ticket;
}

export function TicketRow(props: TicketRowProps) {
    const navigate = useNavigate();
    function navigateToDetail() {
        navigate("/" + props.ticket.id);
    }

    return (
        <div id={"row-ticket-" + props.ticket.id} style={{margin: "10px"}}>
            <div style={{width: "100%", display: "inline-block", whiteSpace: "nowrap",
            overflow: "hidden", textOverflow: "ellipsis"
            }}>Ticket: {props.ticket.id}, {props.ticket.description}</div>

            <button style={{marginLeft: "10px", float:"right"}} onClick={navigateToDetail}>Details</button>

            <br/>

            Status: {props.ticket.completed ? "Completed" : "Incomplete"}
        </div>
    );
}

export default TicketRow;
