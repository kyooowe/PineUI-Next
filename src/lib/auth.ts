import { Lucia } from 'lucia'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { db } from '@/server/db'
import { cookies } from 'next/headers'
import { cache } from 'react'

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

export const validateRequest = async () => {
   const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

   if (!sessionId) {
      return { user: null, session: null };
   }

   try {
      const { user, session } = await lucia.validateSession(sessionId);

      if (session?.fresh) {
         const sessionCookie = lucia.createSessionCookie(session.id);
         cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      } else if (!session) {
         const sessionCookie = lucia.createBlankSessionCookie();
         cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      }

      return { user, session };
   } catch (error) {
      console.error("Failed to validate session:", error);
      return { user: null, session: null };
   }
};

export const cacheValidateRequest = cache(validateRequest)
