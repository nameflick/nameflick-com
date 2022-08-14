import { IDeployConfig } from "@0xflick/backend";
import { GraphQLResolveInfo, OperationTypeNode } from "graphql";
import { MutationError } from "../errors/mutation";
import { createDbContext, IDbContext, IDbOptions } from "./db";
import { createProviderContext, IProviderContext } from "./provider";

export interface ITokenContext {
  getToken: () => string | undefined;
  setToken: (token: string) => void;
  clearToken: () => void;
}
export type TRawContext = IDbContext &
  IProviderContext & {
    config: IDeployConfig;
    isMutation(info: GraphQLResolveInfo): boolean;
    requireMutation(info: GraphQLResolveInfo): void;
  };
export type TContext = ITokenContext & TRawContext;
export type TOptions = IDbOptions;
export async function createContext(
  fullConfig: TOptions & Partial<IDeployConfig> = {}
): Promise<TRawContext> {
  const config = {
    chains: fullConfig.chains,
    infraIpfsProjectId: fullConfig.infraIpfsProjectId,
    infraIpfsSecret: fullConfig.infraIpfsSecret,
    infraIpfsUrl: fullConfig.infraIpfsUrl,
  };
  const self = {
    ...(await createDbContext({
      ssmParamName: fullConfig.ssmParamName,
      ssmRegion: fullConfig.ssmRegion,
    })),
    ...createProviderContext(config),
    config,
    isMutation(info: GraphQLResolveInfo): boolean {
      return info.operation.operation === OperationTypeNode.MUTATION;
    },
    requireMutation(info: GraphQLResolveInfo): void {
      if (!self.isMutation(info)) {
        throw new MutationError();
      }
    },
  };
  return self;
}
