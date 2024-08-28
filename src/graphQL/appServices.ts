import { graphql } from "../lib/appwrite";
import { CreateUser } from "../types/types";

const executeGraphQL = async (query: string, variables: object) => {
  try {
    const response = await graphql.mutation({
      query,
      variables,
    });
    return response;
  } catch (error) {
    console.error("GraphQL Execution Error:", error);
    throw error;
  }
};

const createAccount = ({ email, name, password }: CreateUser) => {
  const query = `mutation CreateAccount(
        $email: String!,
        $password: String!,
        $name: String
    ) {
        accountCreate(
            email: $email,
            password: $password,
            name: $name,
            userId: "unique()"
        ) {
            _id
        }
    }
  `;

  const variables = {
    email,
    password,
    name,
  };

  return executeGraphQL(query, variables);
};

const createSession = ({ email, password }: CreateUser) => {
  const query = `mutation createEmailPasswordSession(
    $email: String!,
    $password: String!
  ) {
    accountCreateEmailPasswordSession(
      email: $email,
      password: $password
    ) {
        _id
        _createdAt
        _updatedAt
        userId
        expire
        provider
        providerUid
        providerAccessToken
        providerAccessTokenExpiry
        providerRefreshToken
        ip
        osCode
        osName
        osVersion
        clientType
        clientCode
        clientName
        clientVersion
        clientEngine
        clientEngineVersion
        deviceName
        deviceBrand
        deviceModel
        countryCode
        countryName
        current
        factors
        secret
        mfaUpdatedAt
    }
  }`;

  const variables = {
    email,
    password,
  };

  return executeGraphQL(query, variables);
};

const getSession = (sessionId: string) => {
  const query = `query getSession(
    $sessionId: String!
  ) {
    accountGetSession(
      sessionId: $sessionId
    ) {
        _id
        _createdAt
        _updatedAt
        userId
        expire
        provider
        providerUid
        providerAccessToken
        providerAccessTokenExpiry
        providerRefreshToken
        ip
        osCode
        osName
        osVersion
        clientType
        clientCode
        clientName
        clientVersion
        clientEngine
        clientEngineVersion
        deviceName
        deviceBrand
        deviceModel
        countryCode
        countryName
        current
        factors
        secret
        mfaUpdatedAt
    }
  }`;

  const variables = {
    sessionId,
  };

  return executeGraphQL(query, variables);
};

const removeSession = (sessionId: string) => {
  const query = `mutation deleteSession(
    $sessionId: String!
  ) {
    accountDeleteSession(
      sessionId: $sessionId
    ) {
       status
    }
  }`;

  const variables = {
    sessionId,
  };

  return executeGraphQL(query, variables);
};

export { createAccount, createSession, getSession, removeSession };
