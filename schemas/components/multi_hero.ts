import { defineField, defineType } from 'sanity'
import { TiersIcon } from '@sanity/icons'

// schemas/project.ts
export default defineType({
  name: 'multi_hero',
  type: 'document',
  title: 'Multi Hero',
  icon: TiersIcon,
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
    }
  },
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle',
    }),
    defineField({
      name: 'heros',
      type: 'array',
      title: 'Heros',
      of: [{ type: 'reference', to: { type: 'hero' } }],
    }),
    defineField({
      name: 'override_title',
      type: 'boolean',
      title: 'Override title and subtitle',
      description: 'When enabled the title and subtitle from this module will be used instead of what is in each of the Hero sections.',
      initialValue: true,
    }),
  ],
})
