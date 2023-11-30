#!/bin/bash

# Run this script if you run out of time in your talk!

# Finish app.
cp index.tsx.complete src/pages/index.tsx
cp query.ts.complete src/server/api/routers/query.ts

# Clear database and push schema.
npx prisma migrate reset && npx prisma db push
