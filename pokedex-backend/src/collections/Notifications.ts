import { CollectionConfig } from 'payload/types';

const Notifications: CollectionConfig = {
  slug: 'notifications',
  access: {
    create: () => false,
    read: ({ req: { user } }) =>
      Boolean(user) && { to_user: { equals: user.id } },
    update: () => false,
    delete: () => false,
  },
  indexes: [
    {
      fields: { to_user: 1, seen: -1 },
    },
  ],
  fields: [
    {
      name: 'to_user',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      index: true,
    },
    {
      name: 'from_user',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
    },
    {
      name: 'pokemon',
      type: 'relationship',
      relationTo: 'pokemons',
      hasMany: false,
    },
    {
      name: 'seen',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  endpoints: [
    {
      path: '/:id/mark-seen',
      method: 'post',
      handler: async (req, res) => {
        const id = req.params.id;
        try {
          await req.payload.update({
            collection: 'notifications',
            id,
            data: { seen: true },
          });
        } catch (e) {
          req.payload.logger.warn(`Error marking notification ${id} as seen`);
        }

        res.status(204).send();
      },
    },
  ],
};

export default Notifications;
