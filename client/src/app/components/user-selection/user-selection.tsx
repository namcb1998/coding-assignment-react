import {Ticket, User} from "@acme/shared-models";
import {useEffect, useRef, useState} from "react";
import {UserService} from "../../services/user-service";
import TicketService from "../../services/ticket-service";

/* eslint-disable-next-line */
export interface UserSelectionProps {
    ticket: Ticket,
    onUnAssignSuccess: any;
    onAssignSuccess: any;
}

export function UserSelection(props: UserSelectionProps) {
    const selectRef = useRef<HTMLSelectElement>(null);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [users, setUsers] = useState([] as User[]);

    useEffect(() => {
        fetchAllUsers();
    }, []);

    function fetchAllUsers() {
        setUsers([]);
        setLoadingUsers(true);
        const usersService = new UserService();
        return usersService.getAllUsers().then((users) => {
            setUsers(users);
            setLoadingUsers(false);
        }).catch((e) => {
            setLoadingUsers(false);
            alert(e.message);
        });
    }

    function onChangeUser(event: any) {
        let assigneeId: any = null;
        if (event.target.value !== 'null') {
            assigneeId = Number(event.target.value);
        }
        setLoadingStatus(true);
        const ticketService = new TicketService();
        if (assigneeId === null) {
            ticketService.unAssignUserToTicket(props.ticket.id).then(() => {
                props.onUnAssignSuccess();
            }).catch((e) => {
                selectRef.current!.value = String(props.ticket.assigneeId);
                alert(e.message);
            }).finally(()=>{
                setLoadingStatus(false);
            });
        } else {
            ticketService.assignUserToTicket(props.ticket.id, assigneeId).then(() => {
                const newUser: any = users.find((user) => {
                    return user.id === assigneeId;
                });
                props.onAssignSuccess(newUser);
            }).catch((e) => {
                selectRef.current!.value = String(props.ticket.assigneeId);
                alert(e.message);
            }).finally(()=>{
                setLoadingStatus(false);
            });
        }
    }


    let listElUser = [] as any[];
    listElUser.push(<option key={-1} value={String(null)}>None</option>)
    listElUser = listElUser.concat(users.map((user) => {
        return <option key={user.id} value={user.id}>{user.id + ". " + user.name}</option>;
    }));
    if (loadingUsers) {
        return <div style={{textAlign: "center"}}>Loading</div>
    }

    return listElUser.length > 0 ? (
        <select disabled={loadingStatus} ref={selectRef} style={{marginLeft: "10px"}} defaultValue={String(props.ticket.assigneeId)} onChange={onChangeUser}>
            {listElUser}
        </select>
    ) : (
        <div style={{textAlign: "center"}}>Empty</div>
    );
}

export default UserSelection;
