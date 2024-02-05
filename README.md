![Build and Deploy Full Stack ChatPDF Clone](https://github.com/Elliott-Chong/chatpdf-yt/assets/77007117/7fcee290-ca52-46ee-ae82-3490f505270b)

[Link to YouTube Tutorial](https://www.youtube.com/watch?v=bZFedu-0emE)

# Overview

Welcome to the "chatpdf-yt" project, a comprehensive chat application with PDF integration. This project is designed to provide a seamless chat experience where users can upload PDF files, create chats around them, and interact with an AI assistant. The AI assistant uses the OpenAI API to generate responses based on the chat context. The application also includes a subscription feature, where users can subscribe to access premium features. The subscription process is handled using Stripe for payments and webhooks for event processing.

hi this is a test change!

# Technologies and Frameworks

- Next.js
- React
- TypeScript
- Tailwind CSS
- Clerk
- Drizzle ORM + Drizzle Kit
- PostgreSQL
- AWS SDK
- OpenAI API
- Stripe
- Axios
- Pinecone
- Drizzle-kit
- OpenAI Edge
- Neon Database Serverless
- Drizzle-orm/neon-http
- @tanstack/react-query
- @clerk/nextjs
- clsx
- tailwind-merge

# Installation

Follow the steps below to install and setup the project:

1. **Clone the repository**

   Open your terminal and run the following command:

   ```bash
   git clone https://github.com/Elliott-Chong/chatpdf-yt.git
   ```

2. **Navigate to the project directory**

   ```bash
   cd chatpdf-yt
   ```

3. **Install Node.js**

   The project requires Node.js version 13.4.19 or later. You can download it from [here](https://nodejs.org/en/download/).

4. **Install the required dependencies**

   Run the following command to install all the required dependencies:

   ```bash
   npm install
   ```

   This will install all the dependencies listed in the `package.json` file, including Next.js, React, React DOM, Axios, Stripe, Tailwind CSS, and other specific dependencies such as "@aws-sdk/client-s3" and "@clerk/nextjs".

5. **Setup environment variables**

   Create a `.env` file in the root directory of your project and add the required environment variables.

6. **Run the project**

   Now, you can run the project using the following command:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# NEW LEARNING

1. BY DEFAULT ROUTE ARE PROTECTED ROUTE, EXCEPT CLERK'S SIGNIN PAGE
2. DRIZZLE ORM IS FASTER THAN PRISMA, SUPPORTS EDGE. ALLOWS CREATING TABLE WITHOUT SQL
3. "double negation" or "bang bang" operator:
   It casts to boolean. The first ! negates it once, converting values like so:

- undefined to true
- null to true
- +0 to true
- -0 to true
- '' to true
- NaN to true
- false to true
- All other expressions to false
  Then the other ! negates it again. A concise cast to boolean, exactly equivalent to ToBoolean simply because ! is defined as its negation. It’s unnecessary here, though, because it’s only used as the condition of the conditional operator, which will determine truthiness in the same way. 4.

4. BANG OPERATOR: tell the TypeScript compiler that you are certain that the value is not null or undefined.
5. cn() in shadcn
6. <p className=" w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
7. pinecone: index-database, namespace-partiction in db

# drizzle commands

npx drizzle-kit push:pg
npx drizzle-kit studio: inbrowser db client

# AI RAG

Vector: Array of number
Its just like an 2d arrow[width, height], or 3d arrow or multidimensional like 1000dimension
