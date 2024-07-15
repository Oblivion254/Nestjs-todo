import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserEmail } from '../common/decorator/user-email.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description:'To Add a new Todo task wrt to the user Email.', summary: 'Add a new task.'})
  @Post()
  async create(@Body() createTodoDto: CreateTodoDto, @UserEmail()
  userEmail: string) {
    console.log("output")
    return this.todoService.create(createTodoDto, userEmail);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description:'To get all the user tasks wrt to the user Email.', summary: 'To get all the user tasks.'})
  @Get()
  async findAll(@UserEmail()
    userEmail: string) {
      console.log(userEmail)
    return this.todoService.findAll(userEmail);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description:'To get a specific user task.', summary: 'To get a specific user tasks.'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description:'To update a specific user task.', summary: 'To update a specific user tasks.'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description:'To delete a specific user task.', summary: 'To get delete a specific user tasks.'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
