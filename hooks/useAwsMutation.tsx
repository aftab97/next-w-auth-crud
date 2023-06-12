import { API } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { graphqlOperation } from "aws-amplify";
import * as mutations from "@/src/graphql/mutations";
import { getApp, listApps } from "@/src/graphql/queries";
import { GetAppQuery } from "@/src/API";

export const createApp = async (): Promise<any> => {
  return await API.graphql({
    ...graphqlOperation(mutations.createApp, {
      input: {
        name: "app2",
        link: "https://s3.example.link.com",
      },
    }),
    authMode: "API_KEY",
  });
};
export const createCommentForApp = async (
  appId: String | String[],
  comment: String
) => {
  return await API.graphql({
    ...graphqlOperation(mutations.createComment, {
      input: {
        content: comment,
        appsID: appId,
      },
    }),
    authMode: "API_KEY",
  });
};

export const findAppWComments = async (appId: String | String[]) => {
  return await API.graphql<GraphQLResult<GetAppQuery>>({
    ...graphqlOperation(getApp, { id: appId }),
    authMode: "API_KEY",
  });
};

export const getAllApps = async () => {
  return await API.graphql({
    ...graphqlOperation(listApps),
    authMode: "API_KEY",
  });
};
