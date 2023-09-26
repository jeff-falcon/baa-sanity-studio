import { HeartIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

// schemas/project.ts
export default defineType({
  name: 'latest_projects',
  type: 'document',
  title: 'Latest Projects',
  icon: HeartIcon,
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
      name: 'title',
      type: 'string',
      title: 'Section Title',
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
