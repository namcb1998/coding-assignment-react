import styles from './add-ticket-bar.module.css';
import React, {useState} from "react";
import TicketService from "../../services/ticket-service";

/* eslint-disable-next-line */
export interface AddTicketBarProps {
    onSuccessAddTicket: any
}

export function AddTicketBar(props: AddTicketBarProps) {
    const [description, setDescription] = useState("");
    const [loadingStatus, setLoadingStatus] = useState(false);
    function handleAddTicket() {
        setLoadingStatus(true);
        const ticketAddBody = {description: description};
        const ticketService = new TicketService();
        ticketService.addTicket(ticketAddBody).then((ticket) => {
            props.onSuccessAddTicket(ticket);
            setDescription("");
            setLoadingStatus(false);
            alert("Success");
        }).catch((e)=> {
            setLoadingStatus(false);
            alert(e.message);
        });
    }

    function handleChange(event: any) {
        setDescription(event.target.value);
    }

    return (
        <div className={styles['container']}>
            <input placeholder={"Description"} type="text" value={description} onChange={handleChange}/>
            <button disabled={loadingStatus || description.trim().length === 0} style={{marginLeft: "10px"}} onClick={handleAddTicket}>
                Add Ticket
            </button>
        </div>
    );


}

export default AddTicketBar;
