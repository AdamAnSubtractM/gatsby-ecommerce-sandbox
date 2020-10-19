import { MdLocalPizza as icon } from 'react-icons/md';
import PriceInput from '../components/PriceInput';

export default {
  name: 'pizza',
  title: 'Pizzas',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'What is the name of the Pizza?',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Photo of Pizza',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Pizza price in cents.',
      validation: (Rule) => Rule.min(1000).max(50000),
      inputComponent: PriceInput,
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
      topping4: 'toppings.4.name',
    },
    prepare: ({ title, media, ...toppings }) => {
      // 1. filter undefined toppings out
      const validToppings = Object.values(toppings).filter(Boolean);
      let previewOfValidToppings = [];
      if (validToppings.length > 4) {
        previewOfValidToppings = validToppings.slice(0, 4);
        previewOfValidToppings.push(`+ ${validToppings.length - 4} more`);
      } else {
        previewOfValidToppings = validToppings;
      }
      // 2. return the preview object for the pizza
      return {
        title,
        media,
        subtitle: previewOfValidToppings.join(', '),
      };
    },
  },
};
