import { PartialType } from '@nestjs/mapped-types';
import { WorkflowDto } from './create-workflow.dto';

export class UpdateWorkflowDto extends PartialType(WorkflowDto) {
  id: number;
}
