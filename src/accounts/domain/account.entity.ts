interface AccountProps {
  id: string;
  name: string;
  email: string;
  handle: string;
  passwordHash: string;
}

export type CreateAccountProps = AccountProps;

export default class Account {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly handle: string;
  readonly passwordHash: string;

  private constructor(input: AccountProps) {
    const normalizedName = input.name.trim();
    const normalizedEmail = input.email.trim();
    const normalizedHandle = input.handle
      .trim()
      .toLowerCase()
      .split(" ")
      .join("_");

    if (!input.id.trim()) {
      throw new Error("Account ID is required");
    }

    if (!normalizedName) {
      throw new Error("Account name is required");
    }

    if (!normalizedEmail) {
      throw new Error("Account email is required");
    }

    if (!normalizedHandle) {
      throw new Error("Account handle is required");
    }

    if (!input.passwordHash.trim()) {
      throw new Error("Account password hash is required");
    }

    this.id = input.id;
    this.name = normalizedName;
    this.email = normalizedEmail;
    this.handle = normalizedHandle;
    this.passwordHash = input.passwordHash;
  }

  static create(input: CreateAccountProps): Account {
    return new Account(input);
  }

  static reconstitute(props: AccountProps): Account {
    return new Account(props);
  }
}
