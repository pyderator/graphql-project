import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  helloWorld: Scalars['String'];
  QueryYourself?: Maybe<UserResponse>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<AuthError>>;
  user?: Maybe<User>;
};

export type AuthError = {
  __typename?: 'AuthError';
  field: Scalars['String'];
  msg: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  LogOut: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};

export type RegisterInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'AuthError' }
      & Pick<AuthError, 'field' | 'msg'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & UserFragment
    )> }
  ) }
);

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'LogOut'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'AuthError' }
      & Pick<AuthError, 'field' | 'msg'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & UserFragment
    )> }
  ) }
);

export type UserQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQueryQuery = (
  { __typename?: 'Query' }
  & { QueryYourself?: Maybe<(
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'AuthError' }
      & Pick<AuthError, 'field' | 'msg'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & UserFragment
    )> }
  )> }
);

export const UserFragmentDoc = gql`
    fragment user on User {
  id
  username
}
    `;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(data: {username: $username, password: $password}) {
    errors {
      field
      msg
    }
    user {
      ...user
    }
  }
}
    ${UserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogOutDocument = gql`
    mutation LogOut {
  LogOut
}
    `;

export function useLogOutMutation() {
  return Urql.useMutation<LogOutMutation, LogOutMutationVariables>(LogOutDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $name: String!) {
  register(data: {username: $username, password: $password, name: $name}) {
    errors {
      field
      msg
    }
    user {
      ...user
    }
  }
}
    ${UserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UserQueryDocument = gql`
    query UserQuery {
  QueryYourself {
    errors {
      field
      msg
    }
    user {
      ...user
    }
  }
}
    ${UserFragmentDoc}`;

export function useUserQueryQuery(options: Omit<Urql.UseQueryArgs<UserQueryQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserQueryQuery>({ query: UserQueryDocument, ...options });
};