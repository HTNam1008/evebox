import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketTypeDto } from './create-tickettype.entity';

export class UpdateTicketTypeDto extends PartialType(CreateTicketTypeDto) {}