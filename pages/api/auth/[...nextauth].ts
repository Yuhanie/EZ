import NextAuth, { NextAuthOptions } from "next-auth"
import LineProvider from "next-auth/providers/line";

export const authOptions: NextAuthOptions = {
  // secret: process.env.SECRET,
  // jwt: {
  //   secret: process.env.SECRET,
  // },
  providers: [
    LineProvider({
      clientId: process.env.LINE_ID??="",
      clientSecret: process.env.LINE_SECRET??=""
    })
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("** sign in **")
      console.log("user:", user)
      console.log("profile:", profile)
      console.log("account:", account)
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      //something wrong there are undefined
    //   session.accessToken = token.accessToken;
    //   session.refreshToken = token.refreshToken;
    //   session.idToken = token.idToken;
    //   session.provider = token.provider;
    //   session.id = token.id;
    //   session.role = token.userRole;//defined in jwt
      console.log("** session **")
      console.log("token",token);
      return session;
    },
    async jwt({ token, account }) {
      //user, account, profile are undefined 
      console.log("** jwt **")
      console.log("account:", account)
      // console.log("user:", user)
      // console.log("profile:", profile)
      // console.log("token in jwt", token)
      if (account){
        //  token.accessToken = account.accessToken;
        // after v4
         token.accessToken = account.access_token
         token.idToken = account.id_token //取得Bearer Token
         
      }
      if (token.email==="benwu@im.fju.edu.tw"){
        token.userRole = "user"
      }
      //token.userRole = "admin"
      return token
    },
  },
}

export default NextAuth(authOptions)