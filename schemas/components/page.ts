import { defineArrayMember, defineField, defineType } from 'sanity'
import { DocumentsIcon } from '@sanity/icons'
// schemas/project.ts
export default defineType({
  name: 'page',
  type: 'document',
  title: 'Page',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Match the path name of the page on the website (e.g. work, about, connect)',
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
      name: 'description',
      type: 'text',
      title: 'Meta description',
      description: 'Used for SEO and social sharing. 1-2 short sentences.',
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'reference',
      to: [{ type: 'hero' }],
    }),
    defineField({
      name: 'components',
      type: 'array',
      title: 'Components',
      of: [
        defineArrayMember({
          name: 'artists_grid_ref',
          title: 'Artists Grid',
          type: 'reference',
          to: [
            { type: 'artists_grid' },
          ],
        }),
        defineArrayMember({
          name: 'latest_projects_ref',
          title: 'Latest Projects',
          type: 'reference',
          to: [
            { type: 'latest_projects' },
          ],
        }),
        defineArrayMember({
          name: 'columned_text_ref',
          title: 'Columned Text',
          type: 'reference',
          to: [
            { type: 'columned_text' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'footer_has_contact_info',
      title: 'Footer has contact info',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'bg_color',
      type: 'simplerColor',
      title: 'Background Color',
      options: {
        enableAlpha: false,
        colorList: [
          { label: 'Dark', value: '#262626' },
          { label: 'Light', value: '#E6E4DF' },
          { label: 'Custom...', value: 'custom' },
        ]
      }
    }),
  ],
})
