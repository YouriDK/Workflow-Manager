import { IsString, IsDate, Allow, IsEmail } from 'class-validator';
import { Workflow } from '../schema/workflow.schema';

export class WorkflowDto {
  @IsString() public _id!: string;
  @IsString() public name!: string;
  @IsDate() public created_at!: Date;
  @IsDate() public updated_at!: Date;
  @Allow() public xml!: string;
  @Allow() public wf_object!: string;
  @IsEmail() public user!: string;
  @IsString() public isFinished!: boolean;
  @Allow() public extras!: string;
  public constructor(workflow: Workflow) {
    // this._id = workflow._id;
    this.name = workflow.name;
    this.created_at = workflow.created_at;
    this.updated_at = workflow.updated_at;
    this.xml = workflow.xml as any;
    this.wf_object = workflow.wf_object;
    this.user = workflow.user;
    this.isFinished = workflow.isFinished;
    this.extras = workflow.extras;
  }
}
