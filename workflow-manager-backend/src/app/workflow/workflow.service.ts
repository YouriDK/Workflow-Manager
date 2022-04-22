import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorkflowDto } from './dto/create-workflow.dto';
import { Workflow, WorkflowDocument } from './schema/workflow.schema';

@Injectable()
export class WorkflowService {
  constructor(
    @InjectModel(Workflow.name)
    private workflow: Model<WorkflowDocument>,
  ) {}

  async create(wfDatas: WorkflowDto): Promise<Workflow> {
    console.log('🤞 Service -> Create wf 🤞');
    const newWorkflow = new Workflow().fill(wfDatas);
    const newBisWF = new this.workflow(newWorkflow);
    return newBisWF.save();
  }

  async findAll(): Promise<Workflow[]> {
    console.log('🤞 Service -> Get All wf 🤞');
    const wfs = this.workflow.find();
    return wfs;
  }

  async findOne(id: string) {
    console.log('🤞 Service -> findOne wf 🤞', id);
    const wf = await this.workflow.findById(id);
    return wf;
  }

  async update(id: string, wfDatasUpdate: WorkflowDto) {
    console.log('🤞 Service -> updateOne wf 🤞', id);
    const wfUpdated = await this.workflow.findByIdAndUpdate(
      id,
      { ...wfDatasUpdate },
      { new: true },
    );
    return wfUpdated;
  }

  async remove(id: string) {
    console.log('🤞 Service -> deleteOne wf 🤞');
    const del = await this.workflow.deleteOne({ _id: id });
    return del;
  }
}
