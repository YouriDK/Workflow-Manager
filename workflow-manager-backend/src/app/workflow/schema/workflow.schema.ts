import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type WorkflowDocument = Workflow & Document;

@Schema()
export class Workflow {
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

  public constructor() {
    // * Something hehe
  }

  public fill(wf: {
    name: string;
    created_at: Date;
    updated_at: Date;
    xml: any;
    wf_object: any;
    user: string;
    isFinished: boolean;
    extras: string;
  }): any {
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
