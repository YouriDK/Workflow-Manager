import { ErrorDetails, ErrorHttpStatus } from 'src/errors/error-handler';

export class WorkflowCreationFailed extends ErrorDetails {
  public constructor() {
    super();
    this.detail = `Error creation workflow`;
    this.type = '/workflow/error-creation';
    this.status = ErrorHttpStatus.NotImplemented;
    this.title = 'Not created';
  }
}
export class GetAllWorkflowsFailed extends ErrorDetails {
  public constructor() {
    super();
    this.detail = `Cannot get all workflow`;
    this.type = '/workflow/get-all-error';
    this.status = ErrorHttpStatus.BadRequest;
    this.title = 'Failed Getting all';
  }
}
export class FindWorkflowsFailed extends ErrorDetails {
  public constructor(id: string) {
    super();
    this.detail = `Cannot get the workflow ${id}`;
    this.type = '/workflow/find-one-error';
    this.status = ErrorHttpStatus.BadRequest;
    this.title = 'Failed Getting wf';
  }
}
export class UpdateWorkflowsFailed extends ErrorDetails {
  public constructor(id: string) {
    super();
    this.detail = `Cannot update the workflow ${id}`;
    this.type = '/workflow/findupdate-one-error';
    this.status = ErrorHttpStatus.BadRequest;
    this.title = 'Failed update wf';
  }
}
export class DeleteWorkflowsFailed extends ErrorDetails {
  public constructor(id: string) {
    super();
    this.detail = `Cannot remove the workflow ${id}`;
    this.type = '/workflow/remove-one-error';
    this.status = ErrorHttpStatus.BadRequest;
    this.title = 'Failed remove wf';
  }
}
