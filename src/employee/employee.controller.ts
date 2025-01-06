import { Controller, Get, Post, Body, Patch, Param, Delete , Query ,Ip} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Prisma } from '@prisma/client';
import { Throttle,SkipThrottle } from '@nestjs/throttler';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

@SkipThrottle()
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  private readonly Logger = new MyLoggerService(EmployeeController.name)
  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeeService.create(createEmployeeDto);
  }

@SkipThrottle({default:true})
  @Get()
  findAll(@Ip() ip:string ,@Query('role')role?:'admin'|'user') {
    this.Logger.log(`Request for ALL EMPLOYEES from \t${ip}`);
    return this.employeeService.findAll(role);
  }

  @Throttle({short:{ttl:1000,limit:1}})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
