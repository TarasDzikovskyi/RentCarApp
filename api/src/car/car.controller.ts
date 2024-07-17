import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  Request,
  UseInterceptors, UseGuards, Query, Req
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Express } from 'express';
import {FileInterceptor} from "@nestjs/platform-express";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";


@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Get('pagination')
  // @UseGuards(JwtAuthGuard)
  findAllByPagination(
      @Query('page') page: number,
      @Query('limit') limit: number
  ) {
    return this.carService.findAllByPagination( +page, +limit);
  }

  @Get('favorite')
  @UseGuards(JwtAuthGuard)
  findFavorite() {
    return this.carService.findFavorite();
  }

  @Get('ads')
  getByAds() {
    return this.carService.getCarsByAds();
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  findAll() {
    return this.carService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carService.findOne(+id);
  }


  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(+id, updateCarDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carService.remove(+id);
  }


  @UseInterceptors(FileInterceptor('file'))
  @Post(':id/upload-file')
  @UseGuards(JwtAuthGuard)
  async addImageToRecipe(
      @UploadedFile() file: Express.Multer.File,
      @Param('id') id: string,
      @Request() req
  ) {
    // const { sub: email } = req.user;
    return this.carService.addFileToCar(file, +id);
  }

}
