import { ConsoleLogger, LoggerService, LogLevel } from '@nestjs/common';
import path from 'path';
import fs from 'fs';

export class CustomLogger implements LoggerService {
  private readonly logFile = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'logs',
    'app.log',
  );
  private readonly consoleLogger = new ConsoleLogger();

  private writeToFile(
    level: LogLevel,
    message: string,
    trace?: string,
    context?: string,
  ) {
    const timestamp = new Date().toISOString();
    const log = `[${timestamp}] [${level}] [${context ? `[${context}]` : ''}] ${message} ${trace ? `\n$TRACE: ${trace}` : ''}\n`;
    const logDir = path.dirname(this.logFile);

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    fs.appendFileSync(this.logFile, log);
  }

  log(message: string, context?: string) {
    this.writeToFile('log', message, context);
    this.consoleLogger.log(message, context);
  }

  error(message: string, trace?: string, context?: string) {
    this.writeToFile('error', message, trace, context);
    this.consoleLogger.error(message, trace, context);
  }

  warn(message: string, context?: string) {
    this.writeToFile('warn', message, context);
    this.consoleLogger.log(message, context);
  }

  debug(message: string, context?: string) {
    this.writeToFile('debug', message, context);
    this.consoleLogger.log(message, context);
  }

  verbose(message: string, context?: string) {
    this.writeToFile('verbose', message, context);
    this.consoleLogger.log(message, context);
  }
}
