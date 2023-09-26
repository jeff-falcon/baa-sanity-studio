import { defineField, defineType } from 'sanity'
import { makeCloudinaryThumb } from '../../lib/util'
import { ImageIcon } from '@sanity/icons'
import React from 'react'

interface FieldParams {
  parent: any
  value: any
}

export default defineType({
  name: 'project_media',
  type: 'document',
  title: 'Project Media',
  icon: ImageIcon,
  preview: {
    select: {
      title: 'name',
      kind: 'kind',
      imageUrl: 'image.secure_url',
      derivedUrl: 'image.derived.0.secure_url',
    },
    prepare({ title, kind, imageUrl, derivedUrl }: any) {
      return {
        title,
        subtitle: kind,
        media: React.createElement('img', { src: makeCloudinaryThumb(derivedUrl || imageUrl) })
      }
    },
  },
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'image',
      type: 'cloudinary.asset',
      title: 'Image (or video placeholder)',
    }),
    defineField({
      name: 'image_mobile',
      type: 'cloudinary.asset',
      title: 'Mobile crop (optional)',
    }),
    defineField({
      name: 'kind',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video BG', value: 'video-bg' },
          { title: 'Video Player', value: 'video-player' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'vimeo_player_src',
      type: 'string',
      title: '1080p Vimeo MP4 URL',
      description: 'Embeds a video player with controls. Use the 1080p MP4 url from Vimeo’s "Video file links"',
      hidden: ({ parent }: FieldParams) => parent.kind !== 'video-player',
    }),
    defineField({
      name: 'thumb_vimeo_src',
      type: 'string',
      title: '720p Vimeo MP4 URL',
      description: 'Use a 720p MP4 file from Vimeo’s "Video file links"',
      hidden: ({ parent }: FieldParams) => parent.kind !== 'video-bg',
    }),
    defineField({
      name: 'thumb_vimeo_src_hd',
      type: 'string',
      title: '1080p Vimeo MP4 URL',
      description: 'Use a 1080p MP4 file from Vimeo’s "Video file links"',
      hidden: ({ parent }: FieldParams) => parent.kind !== 'video-bg',
    }),
    // boolean field for image quality
    defineField({
      name: 'use_original_quality',
      type: 'boolean',
      title: 'Use original quality',
      description: 'When enabled the image quality on the largest screen will use the settings from Cloudinary or the original file if you didn’t make any edits. Only use this if you have uploaded a compressed JPEG or you know what you are doing in the Cloudinary editor. JPEGs larger than 800KB are not recommended if you have this enabled.',
      initialValue: false,
    }),
    defineField({
      name: 'autoplay',
      type: 'boolean',
      title: 'Autoplay video (muted)',
      description: 'Video will start autoplaying muted when the user scrolls to it.',
      initialValue: false,
      hidden: ({ parent }: FieldParams) => parent.kind !== 'video-player',
    }),
    defineField({
      name: 'fill_container',
      type: 'boolean',
      title: 'Use aspect ratio from image',
      description: 'Forces the video player to the use the thumbnail image aspect ratio. Useful inside an Image Pair when using 9:16 video.',
      initialValue: false,
      hidden: ({ parent }: FieldParams) => parent.kind !== 'video-player',
    }),
  ],
})
