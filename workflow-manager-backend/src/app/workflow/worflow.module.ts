import { Module } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkflowController } from './workflow.controller';
import { Workflow, WorkflowSchema } from './schema/workflow.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Workflow.name, schema: WorkflowSchema },
    ]),
  ],
  controllers: [WorkflowController],
  providers: [WorkflowService],
  // * exports: [WorkflowService] To share the module with others
})
export class WorkflowModule {}
