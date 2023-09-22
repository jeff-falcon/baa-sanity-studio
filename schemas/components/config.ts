import { defineArrayMember, defineField, defineType } from 'sanity'
import timezones, { TimeZone } from 'timezones-list';
import { CogIcon } from '@sanity/icons';
import React from 'react';

const timezoneOptions = timezones.map((tz: TimeZone) => { return { title: tz.label, value: tz.tzCode } })
timezoneOptions.sort((a, b) => a.title.localeCompare(b.title))

// schemas/config.ts
export default defineType({
  name: 'config',
  type: 'document',
  title: 'Config',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'contact_info',
      type: 'array',
      title: 'Contact info',
      description: 'Contact info to display in the footer above social links',
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
          ]
        })
      ],
    }),
    defineField({
      name: 'artist_contact_info',
      type: 'array',
      title: 'Artist Page Contact info',
      description: 'Contact info to display in the footer on an artist page',
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
          ]
        })
      ],
    }),
    defineField({
      name: 'socials_group',
      type: 'object',
      title: 'Socials',
      fields: [
        defineField({
          name: 'socials_links',
          type: 'array',
          title: 'Links',
          of: [
            defineArrayMember({
              name: 'social',
              type: 'object',
              title: 'Social',
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'url',
                  imageUrl: 'icon.asset.url'
                },
                prepare({ title, subtitle, imageUrl }: any) {
                  const img = React.createElement('img', { src: imageUrl, style: { backgroundColor: 'black' } })
                  return {
                    title,
                    subtitle,
                    media: img
                  }
                }
              },
              fields: [
                defineField({
                  name: 'name',
                  type: 'string',
                  title: 'Name',
                }),
                defineField({
                  name: 'url',
                  type: 'string',
                  title: 'URL',
                }),
                defineField({
                  name: 'icon',
                  type: 'file',
                  title: 'SVG Icon',
                  description: '1:1 aspect ratio, white fills or strokes, transparent background',
                  options: {
                    accept: 'image/svg+xml',
                  }
                }),
              ],
            })
          ]
        }),
      ]
    }),

  ],
})
