export class Artwork {
  title:string;
  imagePath:string;
  price:number;
  year:number;
  width:number;
  height:number;
  tags:string[];
  media: string;
  isSold: boolean;
  isActive: boolean;
  categoryName: string

  constructor (json) {
    for (let field in json) {
      this[field] = json[field];
    }
  }
}

