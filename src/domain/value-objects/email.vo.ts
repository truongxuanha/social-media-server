// src/domain/value-objects/email.vo.ts
export class Email {
  private readonly _address: string;

  constructor({ address }: { address: string }) {
    if (!this.validate(address)) {
      throw new Error("Invalid email format");
    }
    this._address = address;
  }

  get address(): string {
    return this._address;
  }

  private validate(address: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address);
  }
}
