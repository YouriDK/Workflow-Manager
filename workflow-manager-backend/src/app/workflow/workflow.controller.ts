import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { WorkflowDto } from './dto/create-workflow.dto';
import { WorkflowService } from './workflow.service';

@Controller('workflows')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @MessagePattern('createWorkflow')
  @Post()
  public async create(@Body() wfDatas: WorkflowDto): Promise<void> {
    console.log('🤞 Controllers -> Create wf 🤞');
    await this.workflowService.create(wfDatas);
  }

  @MessagePattern('findAllWorkflow')
  @Get()
  public async findAll(): Promise<WorkflowDto> {
    console.log('🤞 Controllers -> Get all wf 🤞');
    const workflows: any = await this.workflowService.findAll();
    return workflows;
  }

  @MessagePattern('findOneWorkflow')
  @Get(':id')
  public async findOne(@Param('id') id: string) {
    console.log('🤞 Controllers -> findOne wf 🤞');
    return await this.workflowService.findOne(id);
  }

  @MessagePattern('updateWorkflow')
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() wfDatas: WorkflowDto) {
    console.log('🤞 Controllers -> UpdateOne wf 🤞', wfDatas);
    return await this.workflowService.update(id, wfDatas);
  }

  @MessagePattern('removeWorkflow')
  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.workflowService.remove(id);
  }
}
