import pino from 'pino';

export interface ILogger {
  log(message: string): void;
  error(message: string): void;
  warn(message: string): void;
}

export default class Logger implements ILogger {
  private logger: pino.Logger;
  constructor() {
    this.logger = pino();
  }
  public log(message: string): void {
    this.logger.info(message);
  }
  public error(message: string): void {
    this.logger.error(message);
  }
  public warn(message: string): void {
    this.logger.warn(message);
  }
}

export const logger = new Logger();
