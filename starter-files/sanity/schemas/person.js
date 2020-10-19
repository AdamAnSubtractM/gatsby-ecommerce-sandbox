import { MdPerson as icon } from 'react-icons/md';

export default {
  name: 'person',
  title: 'Slicemasters',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Person Name',
      type: 'string',
      description: 'What is the name of the Person?',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Tell us a bit about the person.',
    },
    {
      name: 'image',
      title: 'Photo of Person',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};
