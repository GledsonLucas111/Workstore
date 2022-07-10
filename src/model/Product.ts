export class Product {
  constructor(
    private id: string,
    private name: string,
    private color: string,
    private size: string,
    private description: string,
    private price: string
  ) {}

  getId = (): string => {
    return this.id;
  };
  getName = (): string => {
    return this.name;
  };
  getColor = (): string => {
    return this.color;
  };
  getSize = (): string => {
    return this.size;
  };
  getDescription = (): string => {
    return this.description;
  };
  getPrice = (): string => {
    return this.price;
  };

  setId = (id: string) => {
    this.id = id;
  };
  setName = (name: string) => {
    this.name = name;
  };
  setColor = (color: string) => {
    this.color = color;
  };
  setSize = (size: string) => {
    this.size = size;
  };
  setDescription = (description: string) => {
    this.description = description;
  };
  setPrice = (price: string) => {
    this.price = price;
  };

  static toProductModel(data: Product): Product {
    return new Product(
      data.id,
      data.name,
      data.color,
      data.size,
      data.description,
      data.price
    );
  }
}
