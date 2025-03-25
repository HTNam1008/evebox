import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsOptional, IsArray, ValidateNested, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class UpdateFormInputDto {
  @ApiProperty({ example: 1, description: 'Form input ID' })
  @IsNumber()
  id?: number;

  @ApiProperty({ example: 'Name', description: 'Field name of the form input' })
  @IsString()
  fieldName?: string;

  @ApiProperty({ example: 'text', description: 'Type of the form input (e.g., text, number, select)' })
  @IsString()
  type?: string;

  @ApiProperty({ example: true, description: 'Indicates if this field is required' })
  @IsBoolean()
  required?: boolean;

  @ApiProperty({ example: '^[a-zA-Z0-9]+$', description: 'Regex pattern for input validation', required: false })
  @IsOptional()
  @IsString()
  regex?: string;

  @ApiProperty({ example: ['Option1', 'Option2'], description: 'List of options for the form input (if applicable)', required: false })
  @IsOptional()
  @IsArray()
  options?: any[];
}

export class UpdateFormDto {
  @ApiProperty({ example: '1041811243642', description: 'Showing ID to which the form belongs' })
  @IsString()
  showingId: string;

  @ApiProperty({ example: 'Registration Form', description: 'Name of the form' })
  @IsString()
  name?: string;

  @ApiProperty({ type: [UpdateFormInputDto], description: 'List of form inputs' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateFormInputDto)
  formInputs?: UpdateFormInputDto[];
}