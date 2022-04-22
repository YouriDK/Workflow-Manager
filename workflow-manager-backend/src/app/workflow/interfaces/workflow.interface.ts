export interface IWorkflow {
  _id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  xml: any;
  wf_object: string;
  user: string;
  isFinished: boolean;
  extras: any;
}
