This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

## Running it locally

Made a copy of the `.env.example` to a file `.env`. Run PostgreSQL as container:

```
docker run --name local-postgres -e POSTGRES_PASSWORD=secret -d postgres
```

Afterwards create a database for this project:

```
docker exec -it local-postgres createdb -U postgres localdb
```

You will now be able to run your migrations by running `npm run migrate:dev`.

To start Next.js you can run `npm run dev` and to start the tRPC service you can run `npm run dev:backend`.

## Technologies used

The list of technologies used is the following:

- tRPC for the communication between the Next.js backend and the microservice
- Next.js with App Router
- [shadcn/ui](https://ui.shadcn.com/)
- [pino](https://github.com/pinojs/pino) as logger
- [prisma](https://www.prisma.io/) as ORM
- Typescript
- ESLint for linting
- [zod](https://github.com/colinhacks/zod) for input validation
- [tsx](https://github.com/privatenumber/tsx) for running ts files during development
