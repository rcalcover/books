import { Response } from 'express';

export interface IHttpResponse {
  sendSuccess<T>(
    res: Response,
    data: T,
    message: string,
    statusCode?: number,
  ): void;
  sendError(res: Response, message: string, statusCode?: number): void;
}

export class HttpResponse implements IHttpResponse {
  public sendSuccess<T>(
    res: Response,
    data: T,
    message: string,
    statusCode: number = 200,
  ): void {
    res.status(statusCode).json({
      status: 'success',
      data,
      message,
    });
  }

  public sendError(
    res: Response,
    message: string,
    statusCode: number = 500,
  ): void {
    res.status(statusCode).json({
      status: 'error',
      message,
    });
  }
}
