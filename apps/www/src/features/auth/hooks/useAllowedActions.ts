import { useMemo } from "react";
import { graphQlAllowedActionToPermission } from "graphql/transforms/allowedActions";
import { useGetSelfPermissionsQuery } from "./getSelfPermissions.generated";

export const useAllowedActions = ({ skip }: { skip?: boolean }) => {
  const response = useGetSelfPermissionsQuery({ skip });

  const allowedActions = useMemo(
    () =>
      response?.data?.self?.allowedActions.map(
        graphQlAllowedActionToPermission
      ),
    [response]
  );

  return {
    ...response,
    allowedActions,
  };
};