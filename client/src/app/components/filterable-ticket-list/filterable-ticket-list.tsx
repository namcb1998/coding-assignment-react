import styles from './filterable-ticket-list.module.css';
import TicketRow from "../ticket-row/ticket-row";
import {Ticket} from "@acme/shared-models";

/* eslint-disable-next-line */
export interface FilterableTicketListProps {
    tickets: Ticket[];
    onFilterTicket: any;

    filterOption: string;

    dataStatus: string;
}

export function FilterableTicketList(props: FilterableTicketListProps) {

    function handleChangeFilter(event: any) {
        const option: string = event.target.value;
        props.onFilterTicket(option);
    }

    function ticketItem(ticket: Ticket) {
        return <div className={styles['item-ticket']} key={ticket.id}>
            <TicketRow ticket={ticket} />
        </div>;
    }
    function ticketList() {
        const listElTicket = [] as any[];
        props.tickets.forEach((ticket) => {
            if (props.filterOption === 'none') {
                listElTicket.push(ticketItem(ticket));
            } else if (props.filterOption === 'completed' && ticket.completed) {
                listElTicket.push(ticketItem(ticket));
            } else if (props.filterOption === 'incomplete' && !ticket.completed){
                listElTicket.push(ticketItem(ticket));
            }
        });

        return listElTicket.length > 0 ? (
                <ul className={styles['list-ticket']}>
                    {listElTicket}
                </ul>
            ) : (
                <div style={{textAlign:"center"}}>Empty</div>
            );
    }


  return (
      <div style={{width: "100%", height: "100%", display: "flex", flexFlow: "column"}}>
          <div style={{flex: "0 1 auto"}} className={styles['tickets-header']}>
              <h2 style={{display: "inline"}}>Tickets</h2>
              <div style={{display: "inline", marginLeft: "10px", float:"right"}}>
                  <label htmlFor="filter-ticket">Filter by status:</label>

                  <select style={{marginLeft: "10px"}} name="filter-ticket" defaultValue="none" onChange={handleChangeFilter}>
                      <option value="none">None</option>
                      <option value="completed">Completed</option>
                      <option value="incomplete">Incomplete</option>
                  </select>
              </div>
          </div>

          <div style={{flex: "1 1 auto", minHeight: "0", overflowX: "scroll"}}>
              {props.dataStatus === 'loading' ? (<div style={{textAlign:"center"}}>Loading</div>) : ticketList()}
          </div>
      </div>
  );
}

export default FilterableTicketList;
