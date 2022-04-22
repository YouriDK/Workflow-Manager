import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type WorkflowDocument = Workflow & Document;

@Schema()
export class Workflow {
  // @Prop({ type: mongoose.Types.ObjectId })
  // public _id: string;

  @Prop()
  public name: string;

  @Prop()
  public created_at: Date;

  @Prop()
  public updated_at: Date;

  @Prop()
  public xml: string;

  @Prop()
  public wf_object: string;

  @Prop()
  public user: string;

  @Prop()
  public isFinished: boolean;

  @Prop()
  public extras: string;

  public constructor(/*id?: string */) {
    // if (id) {
    //   this._id = id;
    // }
  }

  public fill(wf: {
    // _id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    xml: any;
    wf_object: any;
    user: string;
    isFinished: boolean;
    extras: string;
  }): any {
    console.log('fiill ->', wf);
    // this._id = wf._id;
    this.name = wf.name;
    this.created_at = wf.created_at;
    this.updated_at = wf.updated_at;
    this.xml = wf.xml;
    this.wf_object = wf.wf_object;
    this.user = wf.user;
    this.isFinished = wf.isFinished;
    this.extras = wf.extras;
    return this;
  }
}

export const WorkflowSchema = SchemaFactory.createForClass(Workflow);
