export class Product {
  constructor(
    private id: string,
    private name: string,
    private color: string,
    private size: string,
    private description: string,
    private price: string,
    private img1: string,
    private img2: string,
    private img3: string
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
  getImg1 = (): string => {
    return this.img1;
  };
  getImg2 = (): string => {
    return this.img2;
  };
  getImg3 = (): string => {
    return this.img3;
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
  setImg1 = (img1: string) => {
    this.img1 = img1;
  };
  setImg2 = (img2: string) => {
    this.img2 = img2;
  };
  setImg3 = (img3: string) => {
    this.img3 = img3;
  };
  static toProductModel(data: Product): Product {
    return new Product(
      data.id,
      data.name,
      data.color,
      data.size,
      data.description,
      data.price,
      data.img1,
      data.img2,
      data.img3
    );
  }
}
