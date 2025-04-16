// Define interfaces to match the DTO structures

export interface ITicketTypeSummary {
  typeName: string
  price: number
  sold: number
  ratio: number
}

export interface IShowTime {
  id: string
  startTime: string | Date
  endTime: string | Date
  isSelected?: boolean
}

export interface IEventSummaryData {
  eventId: number
  eventTitle: string
  showingId: string
  startTime: string | Date
  endTime: string | Date
  totalRevenue: number
  ticketsSold: number
  totalTickets: number
  percentageSold: number
  byTicketType: ITicketTypeSummary[]
}
