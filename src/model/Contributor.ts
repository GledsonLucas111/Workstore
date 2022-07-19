export class Contributor {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string
  ) {}

  getId = (): string => {
    return this.id;
  };
  getName = (): string => {
    return this.name;
  };
  getEmail = (): string => {
    return this.email;
  };
  getPassword = (): string => {
    return this.password;
  };

  setId = (id: string) => {
    this.id = id;
  };
  setName = (name: string) => {
    this.name = name;
  };
  setEmail = (email: string) => {
    this.email = email;
  };
  setPassword = (password: string) => {
    this.password = password;
  };

  static toContributorModel(data: Contributor): Contributor {
    return new Contributor(data.id, data.name, data.email, data.password);
  }
}
