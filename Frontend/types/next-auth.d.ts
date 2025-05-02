// my-project/types/next-auth.d.ts

import NextAuth from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
    interface Session {
        user: {
            image: string,
            id: string,
            username: string,
            email: string,
            firstName: string,
            lastName: string,
            avatar: string,
            name: string
        },
        accessToken?: any
    }
    interface User {
        name: string
        id: string,
        username: string,
        email: string,
        firstName: string,
        lastName: string,
        image: string,
        avatar: string,
    }
}
declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string,
        username: string,
        email: string,
        firstName: string,
        lastName: string,
        avatar: string,
    }
}
