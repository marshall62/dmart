import { Artwork } from './artwork';

test('Can construct Artwork object from json', () => {
    let json = {title: 'Sugar plums', date: '2020', price: '$500.00', tags: ['still life']}
    let artwork = new Artwork(json);
    expect(artwork.title).toBe('Sugar plums');
    expect(artwork.year).toBe('2020');
    expect(artwork.price).toBe('$500.00');
    expect(artwork.tags).toEqual(['still life']);
    expect(artwork.media).toBe(undefined);
    expect(artwork.dimensions).toBe(undefined);
    expect(artwork.imagePath).toBe(undefined);
  })

