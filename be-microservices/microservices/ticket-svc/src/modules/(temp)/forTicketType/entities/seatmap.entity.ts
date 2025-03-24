// import { JsonValue } from 'type-fest';

// export interface Seat{
//   id: number;
//   name: string;
//   rowId: number;
//   position: number;
//   positionX: Float32Array;
//   positionY: Float32Array;
//   createdAt: Date;
//   status: number;
// } 

// export interface Row{
//   id: number;
//   name: string;
//   sectionId: number;
//   createdAt: Date;
//   Seat: Seat[];
// }

// export interface Section{
//   id: number;
//   name: string;
//   seatmapId: number;
//   createdAt: Date;
//   isStage: boolean;
//   element?: JsonValue;
//   attribute: JsonValue;
//   ticketTypeId?: string;
//   Row?: Row[];
// }

// export interface SeatMap{
//   id: number;
//   name: string;
//   createdAt: Date;
//   viewBox: string;
//   status: number;
//   Section: Section[];
// }