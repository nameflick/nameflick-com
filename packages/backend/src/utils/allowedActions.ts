import { createMatcher, and, or, Matcher, oneOf } from "./matcher";
import { EActions, EResource } from "@0xflick/models/permissions";
import { IRolePermission } from "@0xflick/models/rolePermissions";

export type TAllowedAction = Omit<IRolePermission, "roleId">;

function sa(allowedAction: TAllowedAction) {
  return `${allowedAction.action}#${allowedAction.resource}${
    allowedAction.identifier ? `#${allowedAction.identifier}` : ""
  }`;
}

export const isOneOfActionOnResource = (
  oneOfActions: EActions[],
  onResource: EResource,
  identifier?: string
) => {
  return createMatcher<TAllowedAction>({
    matcher(action) {
      return (
        action.resource === onResource &&
        action.identifier === identifier &&
        oneOfActions.includes(action.action)
      );
    },
    describe(a, m) {
      return `action: [${oneOfActions.join(", ")}] on resource ${onResource} ${
        identifier ? `with identifier ${identifier}` : ""
      } ${m(a) ? "===" : "!=="} ${sa(a)}`;
    },
  });
};

export const isActionOnResource = (expectedAction: TAllowedAction) =>
  createMatcher<TAllowedAction>({
    matcher(action) {
      return (
        action.action === expectedAction.action &&
        action.resource === expectedAction.resource
      );
    },
    describe(a, m) {
      return `${sa(a)} ${m(a) ? "===" : "!=="} ${sa(expectedAction)}`;
    },
  });

export const allowAdminAll = createMatcher<TAllowedAction>({
  matcher(action) {
    return (
      action.action === EActions.ADMIN && action.resource === EResource.ALL
    );
  },
  describe(action, m) {
    return m(action) ? "is admin on all" : "is not admin on all";
  },
});

export const allowAdminOnResource = (resource: EResource) =>
  createMatcher<TAllowedAction>({
    matcher(action) {
      return action.action === EActions.ADMIN && action.resource === resource;
    },
    describe(a, m) {
      return `${sa(a)} ${m(a) ? "is admin on" : "is not admin on"} ${resource}`;
    },
  });

export const forIdentifier = (
  identifier: string,
  matcher: Matcher<TAllowedAction>
) =>
  and(
    matcher,
    createMatcher<TAllowedAction>({
      matcher(action) {
        return action.identifier === identifier;
      },
      describe(a, m) {
        return `${sa(a)} ${m(a) ? "is" : "is not"} for ${identifier}`;
      },
    })
  );

export const forSelf = (
  requestedResource: string,
  userAddress: string,
  action: EActions,
  resource: EResource
) =>
  forIdentifier(
    "self",
    and(
      isActionOnResource({
        action,
        resource,
      }),
      createMatcher({
        matcher: () => userAddress === requestedResource,
        describe: (v, m) =>
          `requested resource ${requestedResource} ${
            m(v) ? "===" : "!=="
          } is not for user ${userAddress}`,
      })
    )
  );

export const defaultAdminStrategyAll = (
  resource: EResource,
  ...matchers: Matcher<TAllowedAction>[]
) => oneOf(defaultAdminStrategy(resource, ...matchers));

export const defaultAdminStrategy = (
  resource: EResource,
  ...matchers: Matcher<TAllowedAction>[]
) => {
  return or(allowAdminOnResource(resource), allowAdminAll, ...matchers);
};

export const defaultAdminHandlingForResource = (
  allowedActions: EActions[],
  resource: EResource
) =>
  createMatcher<TAllowedAction>({
    matcher: defaultAdminStrategy(
      resource,
      ...allowedActions.map((a) =>
        isActionOnResource({
          action: a,
          resource,
        })
      )
    ),
    describe(a, m) {
      return m.describe(a);
    },
  });
