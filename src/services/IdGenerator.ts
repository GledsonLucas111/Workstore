import { v4 } from "uuid";

export class IdGenerator {
  static generateId = (): string => v4();
}
