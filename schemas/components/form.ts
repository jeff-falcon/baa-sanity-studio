import { EnvelopeIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'form',
  type: 'document',
  title: 'Form',
  icon: EnvelopeIcon,
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
      name: 'body',
      type: 'array',
      title: 'Body',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
          },
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' }
          ] // yes please, both bullet and numbered
        })
      ],
    }),
    defineField({
      name: 'form',
      type: 'string',
      title: 'Form',
      initialValue: 'contact',
      validation: Rule => Rule.required(),
      options: {
        list: [
          { title: 'General Contact', value: 'contact' },
          { title: 'Job Submission', value: 'job' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
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