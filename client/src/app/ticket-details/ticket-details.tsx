import styles from './ticket-details.module.css';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import TicketService from "../services/ticket-service";
import {Ticket, User} from "@acme/shared-models";
import {UserService} from "../services/user-service";
import StatusSelection from "../components/status-selection/status-selection";
import UserSelection from "../components/user-selection/user-selection";

export function TicketDetails() {
    const {id} = useParams();
    const [loadingTicket, setLoadingTicket] = useState(true);
    const [openAssignField, setOpenAssignField] = useState(false);
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        fetchTicket();
    }, []);

    function fetchUser(id: number) {
        const usersService = new UserService();
        usersService.getUser(id).then((user) => {
            setUser(user);
            setLoadingTicket(false);
        }).catch((e) => {
            setLoadingTicket(false);
            alert(e.message);
        });
    }

    function fetchTicket() {
        const ticketService = new TicketService();
        ticketService.getTicket(id).then((ticket) => {
            setTicket(ticket);
            if (ticket.assigneeId) {
                fetchUser(ticket.assigneeId);
            } else {
                setLoadingTicket(false);
            }
        }).catch((e) => {
            alert(e.message);
        });
    }


    function details() {
        return <div className={styles['detail-div']}>
            <div>
                <label>ID: <span>{ticket?.id} </span></label>
            </div>
            <div>
                <label>Description: <span>{ticket?.description} </span></label>
            </div>
            <div>
                <label>User: {userField()}</label>
            </div>

            <div>
                <label>Status:
                    <span>
                    <StatusSelection ticket={ticket!} onSuccessUpdateStatus={(completed: boolean) => {
                        const newTicket = {...ticket} as Ticket;
                        newTicket.completed = completed;
                        setTicket(newTicket);
                    }}></StatusSelection>
                </span>
                </label>
            </div>
        </div>;
    }

    function showUsers() {
        setOpenAssignField(true);
    }

    function userField() {
        return <span>
            {user ? <span>{user.id + ". " + user.name} </span> : <span>None</span>}
            <button style={{marginLeft: "10px"}} onClick={showUsers}>Assign</button>
            {assignField()}
        </span>;
    }

    function assignField() {
        return openAssignField ? (<div style={{display: "inline-block"}}>
            <UserSelection ticket={ticket!} onUnAssignSuccess={() => {
                const newTicket = {...ticket} as Ticket;
                newTicket.assigneeId = null;
                setTicket(newTicket);
                setUser(null);
            }} onAssignSuccess={(newUser: User) => {
                const newTicket = {...ticket} as Ticket;
                newTicket.assigneeId = newUser.id;
                setTicket(newTicket);
                setUser(newUser);
            }}></UserSelection>
        </div>) : null
    }


    return (
        <div>
            <div style={{width: "30%", height: "100%", display: "flex", flexFlow: "column", border: "1px solid black", padding: "5px"}}>
                <div style={{flex: "0 1 auto"}}>
                    <h2 style={{display: "inline"}}>Ticket Details</h2>
                </div>

                <div style={{flex: "1 1 auto", minHeight: "0", overflowX: "scroll"}}>
                    {loadingTicket ? (<div>Loading</div>) : details()}
                </div>
            </div>
        </div>
    );
}

export default TicketDetails;
