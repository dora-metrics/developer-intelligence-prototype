import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import KeycloakProvider from "next-auth/providers/keycloak";

export const options = {
  providers: [
    {
      id: "openshift",
      name: "OpenShift",
      type: "oauth",
      issuer: process.env.OPENSHIFT_OAUTH_ISSUER_URL,
      authorization: {
        url: process.env.OPENSHIFT_OAUTH_AUTH_URL,
        params: { scope: "user:info"}
      },
      token: process.env.OPENSHIFT_OAUTH_TOKEN_URL,
      userinfo: process.env.OPENSHIFT_OAUTH_USERINFO_URL,
      async profile(profile) {
        return {
          id: profile.metadata.name,
          name: profile.metadata.name
        }},
      clientId: process.env.OPENSHIFT_ID,
      clientSecret: process.env.OPENSHIFT_SECRET
    },
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID,
      clientSecret: process.env.KEYCLOAK_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  pages: {
    signIn: '/',
    signOut: '/',
  }
}
export default NextAuth(options)