import { ThLargeIcon, UserIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { schemeFilter } from 'sanity-plugin-taxonomy-manager'

// schemas/project.ts
export default defineType({
  name: 'artist',
  type: 'document',
  title: 'Artist',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name_internal',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Artist Name',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Used to generate the URL for this project. Make sure it’s unique!',
      options: {
        source: 'name',
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/[^a-z0-9_-]/g, '')
            .slice(0, 200),
      },
    }),
    defineField({
      name: 'featured',
      type: 'array',
      title: 'Featured Projects',
      of: [
        defineArrayMember({
          name: 'project',
          title: 'Project',
          type: 'reference',
          to: [{ type: 'project' }],
        }),
      ],
    }),
    defineField({
      name: 'projects',
      type: 'array',
      title: 'Projects',
      of: [
        defineArrayMember({
          name: 'project',
          title: 'Project',
          type: 'reference',
          to: [{ type: 'project' }],
        }),
      ],
    }),
  ],
})
