export type Attributes = Record<string, unknown>;

export type Context = { attributes?: Attributes };

export type Message = string;

export type LoggerLevel = "debug" | "info" | "warn" | "error" | "fatal";

export abstract class Logger {
  abstract debug(message: Message, context?: Context): void;
  abstract info(message: Message, context?: Context): void;
  abstract warn(message: Message, context?: Context): void;
  abstract error(message: Message, context?: Context): void;
  abstract fatal(message: Message, context?: Context): void;
}
