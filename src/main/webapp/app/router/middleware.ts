import { getLocalStorage } from '@/shared/helpers/storage';

const isLogged = ({ next }) => {
  const user = getLocalStorage('token') || undefined;
  user ? next('/demo') : next();
};

const isNotLogged = ({ next }) => {
  const user = getLocalStorage('token') || undefined;
  !user ? next('/auth') : next();
};

const middlewarePipeline = (next, middleware, index) => {
  const nextMiddleware = middleware[index];

  if (!nextMiddleware) {
    return next;
  }

  return () => {
    const nextPipeline = middlewarePipeline(next, middleware, index + 1);

    nextMiddleware({ next: nextPipeline });
  };
};

export { isLogged, isNotLogged, middlewarePipeline };
