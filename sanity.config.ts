
import { defineConfig, isDev } from 'sanity'
import { visionTool } from '@sanity/vision'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemas'
import { cloudinarySchemaPlugin } from 'sanity-plugin-cloudinary'
import { BespokeLogo } from './ui/BespokeLogo'
import { simplerColorInput } from 'sanity-plugin-simpler-color-input'
import { taxonomyManager } from 'sanity-plugin-taxonomy-manager'

const { theme } = (await import(
  // @ts-expect-error -- TODO setup themer.d.ts to get correct typings
  'https://themer.sanity.build/api/hues?default=bdbcbb;300&primary=cec9b5;300&transparent=bdbcbb;300&positive=43d675;300&caution=fba524;300&lightest=fafafa&darkest=111'
)) as { theme: import('sanity').StudioTheme }

export default defineConfig({
  name: 'default',
  title: 'BAA',
  studio: {
    components: {
      logo: BespokeLogo,
    },
  },

  projectId: process.env.SANITY_STUDIO_PROJECT_ID as string,
  dataset: process.env.SANITY_STUDIO_DATASET as string,

  plugins: [deskTool(), visionTool(), simplerColorInput(), taxonomyManager({}), cloudinarySchemaPlugin(),],

  schema: {
    types: schemaTypes,
  },
  theme,
  document: {
    productionUrl: async (prev, context) => {
      const domain = isDev ? 'http://localhost:5174' : 'https://baa-global.com'
      const { getClient, document } = context
      const client = getClient({ apiVersion: '2023-05-31' })
      if (document._type === 'page') {
        const slug = await client.fetch(
          `*[_type == 'page' && _id == $postId][0].slug.current`,
          { postId: document._id }
        )
        return `${domain}/${slug}`
      } else if (document._type === 'artist') {
        const slug = await client.fetch(
          `*[_type == 'artist' && _id == $postId][0].slug.current`,
          { postId: document._id }
        )
        return `${domain}/artists/${slug}/`
      } else if (document._type === 'project') {
        const slug = await client.fetch(
          `*[_type == 'project' && _id == $postId][0].slug.current`,
          { postId: document._id }
        )
        return `${domain}/projects/${slug}/`
      }
      return prev
    },
  }

})
