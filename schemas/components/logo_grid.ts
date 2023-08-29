import { BlockElementIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'logo_grid',
  type: 'document',
  title: 'Logo Grid',
  icon: BlockElementIcon,
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
      title: 'Section Title',
    }),
    defineField({
      name: 'mobile',
      type: 'file',
      title: 'Mobile SVG image',
      description: '3 column layout of logos',
      options: {
        accept: 'image/svg+xml',
      }
    }),
    defineField({
      name: 'desktop',
      type: 'file',
      title: 'Desktop SVG image',
      description: '6 column layout of logos',
      options: {
        accept: 'image/svg+xml',
      }
    }),
    defineField({
      name: 'color',
      type: 'string',
      title: 'Color',
      options: {
        list: [
          { title: 'Blue', value: 'blue/text-light' },
          { title: 'Yellow', value: 'text-highlight/bg-dark' },
          { title: 'Dark', value: 'bg-darker/bg-light' },
          { title: 'Gray', value: 'gray-mid/bg-light' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'desktop_max_width',
      type: 'number',
      title: 'Max Width for desktop',
      description: 'Max width of the logo grid on desktop',
      validation: Rule => Rule.positive().integer().min(720).max(9999999),
    }),
    defineField({
      name: 'mobile_max_width',
      type: 'number',
      title: 'Max Width for mobile',
      description: 'Max width of the logo grid on desktop',
      validation: Rule => Rule.positive().integer().min(320).max(720),
    }),
  ]
})