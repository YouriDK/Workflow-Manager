import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorkflowDto } from './dto/create-workflow.dto';
import { Workflow, WorkflowDocument } from './schema/workflow.schema';
import {
  DeleteWorkflowsFailed,
  FindWorkflowsFailed,
  GetAllWorkflowsFailed,
  UpdateWorkflowsFailed,
  WorkflowCreationFailed,
} from './wf-errors';

@Injectable()
export class WorkflowService {
  constructor(
    @InjectModel(Workflow.name)
    private workflow: Model<WorkflowDocument>,
  ) {}

  async create(wfDatas: WorkflowDto): Promise<Workflow> {
    console.log('🤞 Service -> Create wf 🤞');
    const newWorkflow = new Workflow().fill(wfDatas);
    const newWF = new this.workflow(newWorkflow);
    if (!newWF) {
      throw new WorkflowCreationFailed();
    }
    return newWF.save();
  }

  async findAll(): Promise<Workflow[]> {
    console.log('🤞 Service -> Get All wf 🤞');
    const wfs = this.workflow.find();
    if (!wfs) {
      throw new GetAllWorkflowsFailed();
    }
    return wfs;
  }

  async findOne(id: string) {
    console.log('🤞 Service -> findOne wf 🤞', id);
    const wf = await this.workflow.findById(id);
    if (!wf) {
      throw new FindWorkflowsFailed(id);
    }
    return wf;
  }

  async update(id: string, wfDatasUpdate: WorkflowDto) {
    console.log('🤞 Service -> updateOne wf 🤞', id);
    const wfUpdated = await this.workflow.findByIdAndUpdate(
      id,
      { ...wfDatasUpdate },
      { new: true },
    );
    if (!wfUpdated) {
      throw new UpdateWorkflowsFailed(id);
    }
    return wfUpdated;
  }

  async remove(id: string) {
    console.log('🤞 Service -> deleteOne wf 🤞');
    const del = await this.workflow.deleteOne({ _id: id });
    if (!del) {
      throw new DeleteWorkflowsFailed(id);
    }
    return del;
  }
}
