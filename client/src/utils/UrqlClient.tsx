import { cacheExchange } from "@urql/exchange-graphcache";
import { createClient, dedupExchange, fetchExchange } from "urql";
import {
  LogOutMutation,
  UserQueryQuery,
  UserQueryDocument,
  LoginMutation,
  RegisterMutation,
} from "../generated/graphql";
import { updateCacheQuery } from "../pages/updateCacheQuery";

const client = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          /* 
          Typical one without types
          LogOut: (_result, args, cache, info) => {
            cache.updateQuery({ query: UserQueryDocument }, data => {
              console.log("the data is", data);
              data!.QueryYourself!.user = null;
              console.log("the data is", data);
              return data;
            });
          */
          LogOut: (_result, args, cache, info) => {
            updateCacheQuery<LogOutMutation, UserQueryQuery>(
              cache,
              { query: UserQueryDocument },
              _result,
              () => ({ QueryYourself: null }),
            );
          },
          login: (_result, args, cache, info) => {
            updateCacheQuery<LoginMutation, UserQueryQuery>(
              cache,
              { query: UserQueryDocument },
              _result,
              (result, query) => ({ QueryYourself: result.login }),
            );
          },
          register: (_result, args, cache, info) => {
            updateCacheQuery<RegisterMutation, UserQueryQuery>(
              cache,
              { query: UserQueryDocument },
              _result,
              (result, query) => ({ QueryYourself: result.register }),
            );
          },
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});

export default client;
