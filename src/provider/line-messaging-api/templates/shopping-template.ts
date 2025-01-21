export const createShoppingTemplate = (data: {
  name: string;
  price: string;
  imageUrl: string;
  link: string;
}) => ({
  type: 'bubble',
  hero: {
    type: 'image',
    url: data.imageUrl,
    size: 'full',
    aspectRatio: '20:13',
    aspectMode: 'cover',
  },
  body: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: data.name,
        weight: 'bold',
        size: 'xl',
      },
      {
        type: 'text',
        text: data.price,
        size: 'sm',
        color: '#999999',
        wrap: true,
      },
    ],
  },
  footer: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'button',
        style: 'link',
        height: 'sm',
        action: {
          type: 'uri',
          label: 'Buy Now',
          uri: data.link,
        },
      },
    ],
  },
});
