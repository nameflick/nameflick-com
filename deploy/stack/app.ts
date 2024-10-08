#!/usr/bin/env node

import * as cdk from "aws-cdk-lib";
import { ImageStack } from "./image.js";
import { jsonFromSecret } from "./utils/files.js";

import { WwwStack } from "./www.js";
import { OrganizationStack } from "./organization.js";
import { IpfsStack } from "./ipfs.js";
import { AssetStack } from "./assets.js";
import { GraphqlStack } from "./graphql.js";
import { DynamoDB } from "./dynamodb.js";
import { NameflickStack } from "./nameflick.js";
import { FaucetStack } from "./faucet.js";
import { DiscordStack } from "./discord.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const deployment = process.env.DEPLOYMENT;
if (!deployment) {
  throw new Error("DEPLOYMENT environment variable is required");
}
const secretsJson = jsonFromSecret(`${deployment}/deploy-secrets.json`);
const jwtJson = jsonFromSecret(`${deployment}/jwt-secrets.json`);
const twitterJson = jsonFromSecret(`${deployment}/twitter-secrets.json`);
const discordJson = jsonFromSecret(`${deployment}/discord-secrets.json`);
const faucetJson = jsonFromSecret(`${deployment}/faucet-secrets.json`);

const app = new cdk.App();

const chainId = "1";

new DiscordStack(app, "Discord", {
  discordBotToken: discordJson["discord-bot-token"],
  discordAppId: discordJson["discord-app-id"],
  discordDomain: discordJson["discord-domain"],
  discordTestingGuildId: discordJson["discord-testing-guild-id"],
  discordPublicKey: discordJson["discord-public-key"],
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
new AssetStack(app, "Assets", {});
new DynamoDB(app, "DynamoDB", {
  env: {
    account: process.env.CDK_DEPLOY_ACCOUNT,
    region: "us-east-2",
  },
});
const { api: graphqlApi } = new GraphqlStack(app, "Graphql", {
  chainId,
  ensRpcUrl: secretsJson.chains["1"].rpc,
  web3RpcUrl: secretsJson.chains["1"].rpc,
  nftRootCollection: secretsJson.chains["1"].nftRootCollection,
  nftCollectionsOfInterest: JSON.stringify(
    secretsJson.chains["1"].nftCollectionsOfInterest
  ),
  chainConfig: JSON.stringify(secretsJson.chains),
  ipfsApiUrl: secretsJson.infraIpfsUrl,
  ipfsApiProject: secretsJson.infraIpfsProjectId,
  ipfsApiSecret: secretsJson.infraIpfsSecret,
  jwk: jwtJson.JWK,
  jwtPublicKey: jwtJson.publicKey,
  jwtClaimIssuer: jwtJson.issuer,
  openSeaApiKey: secretsJson.openSeaApiKey,
  rootDomain: deployment,
  twitterAppKey: twitterJson.TWITTER_APP_KEY,
  twitterAppSecret: twitterJson.TWITTER_APP_SECRET,
  twitterOauthClientId: twitterJson.NEXT_PUBLIC_TWITTER_OAUTH_CLIENT_ID,
  twitterOauthClientSecret: twitterJson.TWITTER_OAUTH_CLIENT_SECRET,
  twitterFollowUserId: twitterJson.follow.userId,
  twitterFollowUserName: twitterJson.follow.name,
  REPLACE__discordTestChannelId: discordJson["discord-testing-guild-id"],
  snsRegion: "us-east-1",
});

new ImageStack(app, "Image", {
  domain: ["image", deployment],
  corsAllowedOrigins: [`https://${deployment}`, "http://localhost:3000"],
  infuraIpfsAuth: `Basic ${Buffer.from(
    `${secretsJson.infraIpfsProjectId}:${secretsJson.infraIpfsSecret}`
  ).toString("base64")}`,
  env: {
    region: "us-east-1",
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
  rootDomain: deployment,
});

new IpfsStack(app, "Ipfs", {
  domain: ["ipfs", deployment],
  corsAllowedOrigins: [`https://${deployment}`, "http://localhost:3000"],
  infuraIpfsAuth: `Basic ${Buffer.from(
    `${secretsJson.infraIpfsProjectId}:${secretsJson.infraIpfsSecret}`
  ).toString("base64")}`,
  env: {
    region: "us-east-1",
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});

new OrganizationStack(app, "Bootstrap");
new NameflickStack(app, "NameflickBeta", {
  domain: ["nameflick-beta", deployment],
  privateKey: secretsJson.privateKey,
  web3RpcUrl: secretsJson.chains["1"].rpc,
  ftToken: secretsJson.FT_TOKEN,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
new FaucetStack(app, "Faucet", {
  domain: ["faucet", deployment],
  privateKey: faucetJson.privateKey,
  web3RpcUrl: faucetJson.webRpc,
  faucetValue: "0.05",
  recaptchaSecret: faucetJson.recaptchaSecret,
  allowedOrigins: faucetJson.allowedOrigins,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
new WwwStack(app, "www", {
  domain: deployment,
  graphqlApiUrl: "45h95rp36i.execute-api.us-east-1.amazonaws.com",
  serverlessBuildOutDir: path.resolve(__dirname, "../.layers/nameflick"),
  withLogging: true,
  whiteListedHeaders: ["Authorization", "Host", "Content-Type", "Accept"],
  env: {
    region: "us-east-1",
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
