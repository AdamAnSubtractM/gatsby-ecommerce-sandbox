import dotenv from 'dotenv';

dotenv.config({ path: `.env` });

export default {
  siteMetadata: {
    title: `Slicks Slices`,
    siteUrl: `https://gatsby.pizza`,
    description: `Best pizza arround!`,
    twitter: `@AdamAnSubtractM`,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      // this is the name of the plugin that you're adding
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: `ewcuzo97`,
        dataset: `production`,
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
