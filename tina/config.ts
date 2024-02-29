import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "master";

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID, // Get this from tina.io
  token: process.env.TINA_READONLY_TOKEN, // Get this from tina.io

  build: { 
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "static",
    },
  },
  schema: {
    collections: [
      {
        name: "blog",
        label: "Blog",
        path: "src/content/blog",
        ui: {
          filename: {
            // if disabled, the editor can not edit the filename
            readonly: true,
            // Example of using a custom slugify function
            slugify: (values) => values?.title ? values.title.split(' ').join('-').toLowerCase() : 'no-title',
          },
        },
        fields: [
          { 
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "image",
            name: "banner",
            label: "Banner",
            required: true,
          },
          {
            type: "image",
            name: "thumbnail",
            label: "Thumbnail",
            required: true,
          },
          {
            type: "string",
            name: "caption",
            label: "Caption",
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            required: true,
            options: ["Guide", "Accommodation", "FAQ", "Test" ]
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "partners",
        label: "Partners",
        path: "src/content/partners",
        ui: {
          filename: {
            // if disabled, the editor can not edit the filename
            readonly: true,
            // Example of using a custom slugify function
            slugify: (values) => values?.name ? values.name.split(' ').join('-').toLowerCase() : 'no-name',
          },
        },
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "type",
            label: "Type",
            required: true,
          },
          {
            type: "string",
            name: "website",
            label: "Website",
            required: true,
          },
          {
            type: "image",
            name: "logo",
            label: "Logo",
            required: true,
          },
          {
            type: "image",
            name: "landscapepic",
            label: "Landscape Picture",
            required: true,
          },
          {
            type: "image",
            name: "squarepic",
            label: "Square Picture",
            required: true,
          },
          {
            type: "string",
            name: "country",
            label: "Country",
            required: true,
            options: ["Australia", "Canada", "Malta", "Great Britain", "Netherland", "France", "USA" ]
          },
          {
            type: "string",
            name: "countrycode",
            label: "Country Code",
            required: true,
            options: ["AU", "CA", "MT", "GB", "NL", "FR", "US" ]
          },
          {
            type: "string",
            name: "latitude",
            label: "Latitude",
            required: true,
          },
          {
            type: "string",
            name: "longitude",
            label: "Longitude",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "service",
        label: "Services",
        path: "src/content/services",
        ui: {
          filename: {
            // if disabled, the editor can not edit the filename
            readonly: true,
            // Example of using a custom slugify function
            slugify: (values) => values?.name ? values.name.split(' ').join('-').toLowerCase() : 'no-name',
          },
        },
        fields: [
          {
            type: "number",
            name: "order",
            label: "Order",
            required: true,
          },
          {
            type: "string",
            name: "name",
            label: "Name",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true
          },
          {
            type: "image",
            name: "landscapepic",
            label: "Landscape (Aspect Ratio: 16 / 9 or Size: 1920 x 1080px)",
            required: true
          },
          {
            type: "image",
            name: "squarepic",
            label: "Square (Aspect Ratio: 9 / 9 or Size: 1080 x 1080px)",
            required: true
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ]
      },
      {
        name: "affiliates",
        label: "Affiliates",
        path: "src/content/affiliates",
        ui: {
          filename: {
            // if disabled, the editor can not edit the filename
            readonly: true,
            // Example of using a custom slugify function
            slugify: (values) => values?.type ? values.type.split(' ').join('-').toLowerCase() : 'no-type',
          },
        },
        fields: [
          {
            type: "string",
            name: "type",
            label: "Type",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "caption",
            label: "Caption",
            required: true
          },
          {
            type: "image",
            name: "squarepic",
            label: "Square (Aspect Ratio: 1:1 or Size: 1080 x 1080px)",
            required: true
          },
          {
            type: "image",
            name: "landscapepic",
            label: "Landscape (Aspect Ratio: 16 / 9 or Size: 1920 x 1080px)",
            required: true
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          }
        ]
      },
      {
        name: "slide",
        label: "Slides",
        path: "src/content/slides",
        ui: {
          filename: {
            // if disabled, the editor can not edit the filename
            readonly: true,
            // Example of using a custom slugify function
            slugify: (values) => values?.name ? values.name.split(' ').join('-').toLowerCase() : 'no-name',
          },
        },
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            required: true,
            isTitle: true,
          },
          {
            type: "string",
            name: "type",
            label: "Type",
            required: true,
            options: ["Top of Homepage", "Map" ]
          },
          {
            label: "List",
            name: "list",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: `slider #${item?.number}`}
              },
              defaultItem: {
                image: "",
                number: 1
              }
            },
            fields: [
              {
                label: "Image (1080 x 1080)",
                name: "image",
                type: "image"
              },
              {
                label: "Number",
                name: "number",
                type: "number",
              }
            ]
          },
        ]
      },
      {
        name: "popup",
        label: "Popups",
        path: "src/content/popup",
        ui: {
          filename: {
            // if disabled, the editor can not edit the filename
            readonly: true,
            // Example of using a custom slugify function
            slugify: (values) => values?.name ? values.name.split(' ').join('-').toLowerCase() : 'no-name',
          },
        },
        fields: [
          {
            type: "boolean",
            name: "active",
            label: "Active",
            required: true,
          },
          {
            type: "string",
            name: "name",
            label: "Name",
            required: true,
            isTitle: true,
          },
          {
            type: "datetime",
            name: "startdate",
            label: "Start Date",
            required: true,
          },
          {
            type: "datetime",
            name: "enddate",
            label: "End Date",
            required: false,
          },
          {
            type: "image",
            name: "image",
            label: "Image (Aspect Ratio: 16:9 or Size: 1600 x 900px or YouTube video dimension)",
            required: false
          },
        ]
      },
      {
        name: "homepageslider",
        label: "Homepage Sliders",
        path: "src/content/homepagesliders",
        ui: {
          filename: {
            // if disabled, the editor can not edit the filename
            readonly: true,
            // Example of using a custom slugify function
            slugify: (values) => values?.title ? values.title.split(' ').join('-').toLowerCase() : 'no-name',
          },
        },
        fields: [
          {
            type: "number",
            name: "order",
            label: "Order (e.g. 1)",
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "Title (e.g. About)",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "text",
            label: "Button Text (e.g. about us)",
            required: true
          },
          {
            type: "string",
            name: "subline",
            label: "Subline (e.g. Discover Our Story and Commitment to Excellence)",
            required: true
          },
          {
            type: "string",
            name: "href",
            label: "URL (e.g. /about)",
            required: true
          },
          {
            type: "image",
            name: "background",
            label: "Background (e.g. 1600 x 900px)",
            required: true
          }
        ],
      },
      {
        name: "course",
        label: "Course",
        path: "src/content/course",
        ui: {
          filename: {
            // if disabled, the editor can not edit the filename
            readonly: true,
            // Example of using a custom slugify function
            slugify: (values) => values?.name ? values.name.split(' ').join('-').toLowerCase() : 'no-title',
          },
        },
        fields: [
          { 
            type: "string",
            name: "name",
            label: "Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
            options: ["BA (Hons)", "BSc (Hons)", "HND", "MA" ]
          },
          {
            type: "image",
            name: "banner",
            label: "Banner",
            required: true,
          },
          {
            type: "string",
            name: "caption",
            label: "Caption",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
      stopwordLanguages: ['eng']
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100
  }
});
