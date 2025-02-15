import { Controller, Get, Post, Delete, Body, Param, HttpStatus, Res } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Category created successfully' })
  async create(@Body('name') name: string, @Res() res: Response) {
    const result = await this.categoriesService.create(name);
    if (result.isErr()) return res.status(HttpStatus.BAD_REQUEST).json({ message: result.unwrapErr().message });
    return res.status(HttpStatus.CREATED).json(result.unwrap());
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Categories retrieved successfully' })
  async findAll(@Res() res: Response) {
    const result = await this.categoriesService.findAll();
    return res.status(HttpStatus.OK).json(result.unwrap());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by ID' })
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const result = await this.categoriesService.findOne(id);
    if (result.isErr()) return res.status(HttpStatus.NOT_FOUND).json({ message: result.unwrapErr().message });
    return res.status(HttpStatus.OK).json(result.unwrap());
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category by ID' })
  async remove(@Param('id') id: number, @Res() res: Response) {
    const result = await this.categoriesService.remove(id);
    if (result.isErr()) return res.status(HttpStatus.BAD_REQUEST).json({ message: result.unwrapErr().message });
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
