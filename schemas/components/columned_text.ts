import { SplitVerticalIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'columned_text',
  type: 'document',
  title: 'Columned Text',
  icon: SplitVerticalIcon,
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
    }
  },
  hidden: true,
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
      name: 'bordered_title',
      type: 'boolean',
      title: 'Border under title',
      hidden: ({ parent }) => parent.title == '',
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Body',
      validation: Rule => Rule.required().min(2).max(4),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'column',
          title: 'Column',
          fields: [
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
          ]
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