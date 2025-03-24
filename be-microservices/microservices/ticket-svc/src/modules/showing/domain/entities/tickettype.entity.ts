export interface TicketType{
  id: string;
  name: string;
  description: string;
  color: string;
  isFree:         Boolean;
  price:          number;
  originalPrice:  number;
  maxQtyPerOrder: number;
  minQtyPerOrder: number;
  startTime:  Date;
  endTime:    Date;
  position:      number;
  status:         String;
  imageUrl:       String;
  isHidden:       Boolean;
}