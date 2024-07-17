import {Controller, Post, Body, UsePipes, ValidationPipe, Request, Get, UseGuards, Patch, Param} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {UpdateCarDto} from "../car/dto/update-car.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    // @Get()
    // findOne(@Request() req) {
    //   return this.userService.findOne(req.user.email)
    // }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/favorite')
    update(@Param('id') id: string, @Request() req) {
        return this.userService.toggleFavorite(+id, +req.user.id);
    }

}
