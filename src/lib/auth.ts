import { Lucia } from 'lucia'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { db } from '@/server/db'

const adapter = new PrismaAdapter(db.session, db.user)

export const lucia = new Lucia(adapter, {
   sessionCookie: {
      name: "pine",
      expires: false,
      attributes: {
         secure: process.env.NODE_ENV === "production"
      },
   },
   getUserAttributes(databaseUserAttributes) {
      return {
         id: databaseUserAttributes.id,
         email: databaseUserAttributes.email,
         fullName: databaseUserAttributes.fullName
      }
   }
})

declare module "lucia" {
   interface Register {
      Lucia: typeof lucia;
      DatabaseUserAttributes: DatabaseUserAttributes
   }
}

interface DatabaseUserAttributes {
   id: number;
   email: string;
   fullName: string;
}