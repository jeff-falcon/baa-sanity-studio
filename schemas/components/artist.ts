import { DashboardIcon, EarthGlobeIcon, SplitVerticalIcon, UserIcon } from '@sanity/icons'
import React from 'react'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { schemeFilter } from 'sanity-plugin-taxonomy-manager'
import { makeCloudinaryThumb } from '../../lib/util'

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
      name: 'nickname',
      type: 'string',
      title: 'Known As',
      description: 'Used in the footer where it says "Interested in working with [nickname]..."'
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
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({
        type: 'reference',
        to: { type: 'skosConcept' },
        options: {
          filter: () => schemeFilter({ schemeId: '220fd4' }),
          disableNew: true,
        },
      }),]
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
              username: 'username',
              url: 'url'
            },
            prepare(value) {
              const { title, username, url } = value as { title: string, username: string, url: string }
              const isSocial = username && title !== 'website'
              return {
                title,
                subtitle: isSocial ? `@${username}` : url,
                media: isSocial ? UserIcon : EarthGlobeIcon
              }
            }
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
      title: 'Featured Media',
      description: 'Used on the home page in their artist module.',
      of: [
        defineArrayMember({
          name: 'project_media',
          title: 'Project Media',
          type: 'reference',
          to: [{ type: 'project_media' }],
        }),
      ],
    }),
    defineField({
      name: 'portfolio',
      type: 'reference',
      title: 'Portfolio',
      description: 'Appears at the top above other projects on their artist page.',
      to: [{ type: 'project' }],
    }),
    defineField({
      name: 'projects',
      type: 'array',
      title: 'Projects',
      of: [
        defineArrayMember({
          name: 'project',
          title: 'Project Single',
          type: 'reference',
          to: [{ type: 'project' }],
        }),
        defineArrayMember({
          name: 'project_pair',
          type: 'object',
          title: 'Project Pair',
          icon: SplitVerticalIcon,
          preview: {
            select: {
              titleLeft: 'left.name',
              titleRight: 'right.name',
              imageUrl: 'left.image.secure_url',
            },
            prepare({ titleLeft, titleRight, imageUrl }: any) {
              return {
                title: 'Project Pair',
                subtitle: `${titleLeft} + ${titleRight}`,
                media: React.createElement('img', { src: makeCloudinaryThumb(imageUrl) })
              }
            },
          },
          fields: [
            defineField({
              name: 'left',
              type: 'reference',
              weak: true,
              to: [
                {
                  type: 'project',
                },
              ],
            }),
            defineField({
              name: 'right',
              weak: true,
              type: 'reference',
              to: [{ type: 'project' }],
            }),
          ],
        }),
        defineArrayMember({
          name: 'project_trio',
          type: 'object',
          title: 'Project Trio',
          icon: DashboardIcon,
          preview: {
            select: {
              title1: 'top.name',
              title2: 'bottom.name',
              title3: 'side.name',
              imageUrl: 'top.image.secure_url',
            },
            prepare({ title1, title2, title3, imageUrl }: any) {
              return {
                title: 'Project Trio',
                subtitle: `${title1} + ${title2} + ${title3}`,
                media: React.createElement('img', { src: makeCloudinaryThumb(imageUrl) })
              }
            },
          },
          fields: [
            defineField({
              name: 'top',
              type: 'reference',
              weak: true,
              title: 'Small top project',
              to: [{ type: 'project' }],
            }),
            defineField({
              name: 'bottom',
              weak: true,
              title: 'Small bottom project',
              type: 'reference',
              to: [{ type: 'project' }],
            }),
            defineField({
              name: 'side',
              weak: true,
              title: 'Large project',
              type: 'reference',
              to: [{ type: 'project' }],
            }),
            defineField({
              name: 'align',
              type: 'string',
              title: 'Alignment',
              description: 'Aligns the large project to the left or right',
              initialValue: 'left',
              options: {
                list: [
                  { title: 'Left', value: 'left' },
                  { title: 'Right', value: 'right' },
                ],
                layout: 'radio',
                direction: 'horizontal',
              }
            })
          ],
        }),
      ],
    }),
  ],
})
