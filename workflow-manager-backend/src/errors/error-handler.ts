/* eslint-disable max-classes-per-file */
/* istanbul ignore file */

import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

/**
 * Don't hesitate to add http error status if not present in the following enum
 * https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
 */
export enum ErrorHttpStatus {
  /** A generic error message when unexpected conditions encountered and no more specific message is suitable */
  UnexpectedServerError = 500,
  /** The server cannot or will not process the request due to an apparent client error */
  BadRequest = 400,
  /** Insufficient permissions or prohibited action (e.g. creating a duplicate record where only one is allowed) */
  Forbidden = 403,
  /** Resource not found */
  NotFound = 404,
  /** Conflict in the current state of the resource */
  Conflict = 409,
  /** Header range is not satisfiable (e.g. header format not respected) */
  HeaderRangeNotSatisfiable = 416,
  /** Do not recognize the request method or lack the ability to fulfil it (Usually this implies future availability) */
  NotImplemented = 501,
  /** Cannot respond according the header accept not */
  WrongHeaderAccept = 406,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnknownError = any;

/** RFC 7807 */
export class ErrorDetails extends Error {
  /** HTTP status code */
  public status: number;
  /** A short, human-readable summary of the problem type */
  public title: string;
  /** A human-readable explanation of the problem */
  public detail: string;
  /** A URI reference. Also used for front translated error message. */
  public type: string;
  /** Additional member : additional debug information */
  public debug?: string;

  public constructor(
    error: {
      status?: number;
      title?: string;
      detail?: string;
      debug?: string;
      type?: string;
    } = {},
  ) {
    super();
    this.status = error.status ?? ErrorHttpStatus.UnexpectedServerError;
    this.title = error.title ?? 'Unknow error';
    this.detail = error.detail ?? 'Unknow detail';
    this.debug = error.debug;
    this.type = error.type ?? 'about:blank';
  }
}

@Catch()
export class ErrorHandler implements ExceptionFilter {
  public catch(exception: UnknownError, host: ArgumentsHost): void {
    let error: ErrorDetails;

    if (!exception?.status) {
      // Parse unexpected errors (not throwed by our code with "throw new MyCustomSpecificError()")
      error = new ErrorDetails({
        title: 'Unexpected error',
        detail: exception.toString(),
      });
    } else if (exception.response?.query) {
      // Parse TypeORM errors
      error = new ErrorDetails({
        status: exception.status,
        title: 'Database error',
        detail: exception.message,
        debug: JSON.stringify(exception.response),
        type: exception.type,
      });
    } else if (exception?.response?.statusCode === 400) {
      // Parse NestJS request parameters type validation errors
      error = new ErrorDetails({
        status: exception.response.statusCode,
        title: exception.response.error,
        detail: Array.isArray(exception.response.message)
          ? exception.response.message.join(', ')
          : exception.response.message,
        debug: exception.detail,
        type: '/request-validation',
      });
    } else if (
      exception?.response?.statusCode === 404 &&
      exception?.response?.error === 'Not Found' &&
      !exception?.type
    ) {
      // Parse NestJS request parameters type validation errors
      error = new ErrorDetails({
        status: exception.response.statusCode,
        title: 'Cannot reach this route',
        detail: exception?.response?.message,
        debug: exception?.response?.message,
        type: '/path-route-error',
      });
    } else {
      // Parse generic case errors (our errors throwed with "throw new MyCustomSpecificError()")
      error = new ErrorDetails({
        status: exception.status,
        title: exception.title,
        detail: exception.detail,
        debug: exception.debug,
        type: exception.type,
      });
    }
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(error.status).json(error);
  }
}
