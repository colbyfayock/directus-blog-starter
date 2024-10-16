# Next.js Blog with Directus

Demo: https://directus-blog-starter.vercel.app/

## Getting Started

1. Create a new local project

```
npx create-next-app@latest https://github.com/colbyfayock/directus-blog-starter
```

You can also fork, clone, or even deploy it to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcolbyfayock%2Fdirectus-blog-starter)

2. Create a .env.local file or configure your environment variables to include:

```
DIRECTUS_API_ENDPOINT="<Directus URL (ex: mydirectus.com)>"
```

3. Install dependencies and start the project.

```
npm install
npm run dev
```

And you should now be running the project at http://localhost:3000/!

## Setting Up Directus

Once you have your Next.js project in place, you can customize the content to your existing project or you can
add new Directus schemas and fields to match what comes with the template out-of-the-box.

To set up the project using the existing template, add the following models and fields.

```
Data Model: global
Fields:
- id: integer (auto-incrementing Primary Key)
- title: Input - string
- tagline: Input - string

Data Model: post_categories
Fields:
- slug: string (Manually Entered Primary Key)
- title: Input - string

Data Model: posts
Fields:
- date_created: Datetime - timestamp
- title: Input - string
- body: Block Editor
- categories: Many to Many - post_categories

Data Model: home
Fields:
- id: integer (auto-incrementing Primary Key)
- hero_title: Input - string
- hero_subtitle: Input - string
- hero_buttons: Repeater - label: string, link: string
- hero_cover: Image
- services_title: Input - string
- services_subtitle: Input - string
- services_list: Repeater - title: string, description: text
- quote_text: Input - string
- quote_name: Input - string
- quote_position: Input - string
- featued_title:
- featured_posts: Many to Many - posts

Data Model: pages
Fields:
- slug: string (Manually Entered Primary Key)
- title: Input - String
- link: Input - String
- body: Block Editor

Data Model: courses
Fields:
- slug: string (Manually Entered Primary Key)
- title: Input - String
- navigation: Dropdown - string, "yes" or "no", default "no"
- body: Block Editor
- hero_cover: Image
```

Be sure to configure open public access for all models to be queryable by the public endpoint.
