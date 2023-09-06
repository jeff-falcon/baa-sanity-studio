import { defineArrayMember, defineField, defineType } from 'sanity'
import { makeCloudinaryThumb } from '../../lib/util'
import { PresentationIcon } from '@sanity/icons'
import { schemeFilter } from 'sanity-plugin-taxonomy-manager'
import React from 'react'

interface FieldParams {
  parent: any
  value: any
}

export default defineType({
  name: 'project',
  type: 'document',
  title: 'Project',
  icon: PresentationIcon,
  preview: {
    select: {
      title: 'name',
      subtitle: 'client',
      kind: 'kind',
      imageUrl: 'image.secure_url',
    },
    prepare({ title, subtitle, imageUrl }: any) {
      return {
        title,
        subtitle,
        media: React.createElement('img', { src: makeCloudinaryThumb(imageUrl) })
      }
    },
  },
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Appears on the project page and in the browser tab.',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Used to generate the URL for this project. Make sure it’s unique!',
      options: {
        source: 'title',
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
      name: 'client',
      type: 'string',
      title: 'Subtitle',
    }),
    defineField({
      name: 'meta_description',
      type: 'string',
      title: 'Meta Description',
      description: 'Used for SEO and social sharing. 1-2 short sentences.',
    }),
    defineField({
      name: 'image',
      type: 'cloudinary.asset',
      title: 'Thumbnail image (or video placeholder)',
    }),
    defineField({
      name: 'kind',
      type: 'string',
      title: 'Thumbnail type',
      initialValue: 'image',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video BG', value: 'video-bg' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'thumb_vimeo_src',
      type: 'string',
      title: 'Thumbnail video: 720p Vimeo MP4 URL',
      description: 'Use a 720p MP4 file from Vimeo’s "Video file links"',
      hidden: ({ parent, value }: FieldParams) => parent.kind !== 'video-bg',
    }),
    defineField({
      name: 'thumb_vimeo_src_hd',
      type: 'string',
      title: 'Thumbnail video: 1080p Vimeo MP4 URL',
      description: 'Use a 1080p MP4 file from Vimeo’s "Video file links"',
      hidden: ({ parent, value }: FieldParams) => parent.kind !== 'video-bg',
    }),
    defineField({
      name: 'description_intro',
      type: 'array',
      title: 'Intro Description',
      description: 'The first block of copy on the project page. Keep it as one paragraph and 1-2 sentences.',
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
      name: 'description',
      type: 'array',
      title: 'Additional description',
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
      name: 'credits',
      type: 'array',
      title: 'Credits',
      of: [
        defineArrayMember({
          name: 'credit',
          type: 'object',
          title: 'Credit',
          preview: {
            select: {
              title: 'name',
              subtitle: 'credit'
            },
          },
          fields: [
            { name: 'name', type: 'string', title: 'Title' },
            { name: 'credit', type: 'string', title: 'Credit' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'media',
      type: 'array',
      title: 'Media',
      of: [
        defineArrayMember({
          name: 'item',
          type: 'reference',
          title: 'Single Item',
          weak: true,
          to: [{ type: 'project_media' }],
        }),
        defineArrayMember({
          name: 'item_pair',
          type: 'object',
          title: 'Image Pair',
          preview: {
            select: {
              titleLeft: 'left.name',
              titleRight: 'right.name',
              imageUrl: 'left.image.secure_url',
            },
            prepare({ titleLeft, titleRight, imageUrl }: any) {
              return {
                title: `${titleLeft} + ${titleRight}`,
                subtitle: 'Image Pair',
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
                  type: 'project_media',
                },
              ],
            }),
            defineField({
              name: 'right',
              weak: true,
              type: 'reference',
              to: [{ type: 'project_media' }],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'bg_color',
      type: 'simplerColor',
      title: 'Background Color',
      options: {
        enableAlpha: false,
        colorList: [
          { label: 'Dark Gray', value: '#262626' },
          { label: 'Rust', value: '#6d3434' },
          { label: 'Olive', value: '#3f4239' },
          { label: 'Cream', value: '#EFF4E3' },
          { label: 'Light Goldenrod', value: '#E9F1CF' },
          { label: 'Custom...', value: 'custom' },
        ]
      }
    }),
    defineField({
      name: 'show_related_projects',
      type: 'boolean',
      title: 'Show Related Projects',
      description: 'Show a grid of related projects at the bottom of the page.',
      initialValue: true,
    }),
    defineField({
      name: 'related_projects_bg_color',
      type: 'simplerColor',
      title: 'Related Projects Section Background Color',
      description: 'Show a grid of related projects at the bottom of the page.',
      options: {
        enableAlpha: true,
        colorList: [
          { label: 'Dark Gray', value: '#262626' },
          { label: 'Rust', value: '#6d3434' },
          { label: 'Olive', value: '#3f4239' },
          { label: 'Cream', value: '#EFF4E3' },
          { label: 'Light Goldenrod', value: '#E9F1CF' },
          { label: 'Custom...', value: 'custom' },
        ]
      }
    }),
  ],
})
