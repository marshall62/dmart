export class Artwork {
  title:string;
  url:string;
  price:string;
  date:string;
  dimensions:string;
  tags:string[];
  media: string;
  exemplarTitle: string

  constructor (json) {
    for (let field in json) {
      this[field] = json[field];
    }
  }
}

