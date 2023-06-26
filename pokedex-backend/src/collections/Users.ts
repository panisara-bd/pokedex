import { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
  slug: 'users',
  timestamps: false,
  auth: {
    verify: false,
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      unique: true,
      required: true,
      hidden: true,
    },
    {
      name: 'username',
      type: 'text',
    },
  ],
};

export default Users;
