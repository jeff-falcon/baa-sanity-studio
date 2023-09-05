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
      name: 'layout',
      type: 'string',
      title: 'Layout',
      initialValue: 'even',
      options: {
        list: [
          { title: 'Equal widths', value: 'even' },
          { title: 'Left column dominant', value: 'left' },
          { title: 'Right column dominant', value: 'right' },
        ],
        layout: 'radio',
        direction: 'vertical',
      }
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Body',
      validation: Rule => Rule.required().min(1).max(2),
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
                    annotations: [
                      {
                        name: 'link',
                        type: 'object',
                        title: 'link',
                        fields: [
                          {
                            name: 'url',
                            type: 'url',
                            validation: Rule => Rule.uri({
                              scheme: ['https', 'mailto']
                            })
                          }
                        ]
                      }
                    ]
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

  ]
})