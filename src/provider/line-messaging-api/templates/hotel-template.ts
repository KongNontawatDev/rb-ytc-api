export const createHotelTemplate = () => [
  {
    type: 'flex',
    altText: 'This is a Flex Message',
    contents: {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: 'test',
            weight: 'bold',
            size: 'xl',
          },
          {
            type: 'text',
            text: 'test',
            size: 'sm',
            color: '#999999',
            wrap: true,
          },
        ],
      },
    },
  },
];
