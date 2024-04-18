import { useLayoutEffect } from 'react';
import { useInstantSearch } from 'react-instantsearch';
import { createInsightsMiddleware } from 'instantsearch.js/es/middlewares';

function InsightsMiddleware() {
  const { addMiddlewares } = useInstantSearch();

  useLayoutEffect(() => {
    const middleware = createInsightsMiddleware({
      insightsClient: window.aa,
    });

    return addMiddlewares(middleware);
  }, [addMiddlewares]);

  return null;
}

export default InsightsMiddleware;
