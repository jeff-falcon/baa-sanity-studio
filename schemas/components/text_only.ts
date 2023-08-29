import { BillIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'text_only',
  type: 'document',
  title: 'Text Block',
  icon: BillIcon,
  preview: {
    select: {
      title: 'name',
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
      name: 'body',
      type: 'array',
      title: 'Body',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Normal', value: 'normal' },
          ],
          lists: [],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'background_color',
      type: 'string',
      title: 'Background color',
      initialValue: 'transparent',
      options: {
        list: [
          { title: 'Transparent', value: 'transparent' },
          { title: 'Dark', value: 'dark' },
          { title: 'Darker', value: 'darker' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      }
    }),
  ]
})