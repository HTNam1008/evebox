import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketTypeDto } from './create-tickettype.dto';

export class UpdateTicketTypeDto extends PartialType(CreateTicketTypeDto) {}