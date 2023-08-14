```
pnpm add @prisma/client
```

```
pnpm add -D ts-node prisma
```

```
pnpm prisma init --datasource-provider mysql
```


```
pnpm prisma generate
```

see file "prisma/schema.prisma"
create "prisma/seed.ts"
add DATABASE_URL to .env
add .env in .gitignore

add to pcakage json

```
{
"prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  },
}
```
this also created prisma client that created by generate function
```
pnpm prisma migrate dev --name init
```
seed file push
```
pnpm prisma db seed
```

if shadow database error instead of migrate this command works
```
pnpm prisma db push
```
