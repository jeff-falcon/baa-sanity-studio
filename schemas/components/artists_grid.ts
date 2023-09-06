import { ThLargeIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

// schemas/project.ts
export default defineType({
  name: 'artists_grid',
  type: 'document',
  title: 'Artists Grid',
  icon: ThLargeIcon,
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
    },
    prepare(value, viewOptions) {
      const { title, subtitle } = value as { title: string, subtitle: string }
      return {
        title,
        subtitle: subtitle ? `Section title: ${subtitle}` : '',
      }
    },
  },
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'show_all',
      type: 'boolean',
      title: 'Show all artists',
    }),
    defineField({
      name: 'sorting',
      type: 'string',
      title: 'Sorting',
      initialValue: 'alpha',
      hidden: ({ parent }: any) => parent?.show_all !== true,
      options: {
        list: [
          { title: 'Alphabetical (A-Z)', value: 'alpha' },
          { title: 'Most recent (modified date)', value: 'date' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      }
    }),
    defineField({
      name: 'artists',
      type: 'array',
      title: 'Artists',
      hidden: ({ parent }: any) => parent?.show_all !== false,
      of: [
        defineArrayMember({
          name: 'artist',
          title: 'Artist',
          type: 'reference',
          to: [{ type: 'artist' }],
        }),
      ],
    }),
  ],
})
