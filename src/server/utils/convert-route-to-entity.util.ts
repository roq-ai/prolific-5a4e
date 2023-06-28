const mapping: Record<string, string> = {
  contents: 'content',
  startups: 'startup',
  subscriptions: 'subscription',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
