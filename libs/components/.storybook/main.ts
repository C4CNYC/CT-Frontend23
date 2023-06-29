import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ["../src/lib/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  env: {
    NEXT_PUBLIC_API_URL: "https://api-dev.codetribe.codes",

    NEXT_PUBLIC_CODE_STREAM_API: "https://stream.codetribe.codes",

    S3_UPLOAD_KEY: "AKIAV7VPUYNWTLGLV742",
    S3_UPLOAD_SECRET: "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",
    S3_UPLOAD_BUCKET: "devnest",
    S3_UPLOAD_REGION: "us-east-1",

    NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyBldef78eB3CPqHgC5tFO-Mgsg3P9pnDLE",
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "codetribe-postgres.firebaseapp.com",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: "codetribe-postgres",
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "codetribe-postgres.appspot.com",
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "540401829589",
    NEXT_PUBLIC_FIREBASE_APP_ID: "1:540401829589:web:2998e726aa0999ba89845c",
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: "G-R1L3JQHVK9",
  }
}

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
