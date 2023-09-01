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
      name: 'location',
      type: 'string',
      title: 'Location',
    }),
    defineField({
      name: 'bio',
      type: 'array',
      title: 'Long bio',
      description: 'Appears below the intro block.',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'clients',
      type: 'text',
      title: 'Clients and publications',
      description: 'A single block of text with clients and publications separated by commas.',
    }),
    defineField({
      name: 'links',
      type: 'array',
      title: 'Links',
      of: [
        defineArrayMember({
          name: 'link',
          type: 'object',
          title: 'Link',
          preview: {
            select: {
              title: 'name',
              subtitle: 'credit'
            },
          },
          fields: [
            {
              name: 'name', type: 'string', title: 'Title', initialValue: 'website', options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Behance', value: 'behance' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Website', value: 'website' },
                ],
                direction: 'vertical',
                layout: 'radio',
              }
            },
            { name: 'url', type: 'url', title: 'Url', hidden: ({ parent }) => parent.name !== 'website' },
            { name: 'username', type: 'string', title: 'Username', hidden: ({ parent }) => parent.name === 'website' },
          ],
        }),
      ],
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
