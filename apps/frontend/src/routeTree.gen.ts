/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PublicRouteImport } from './routes/_public/route'
import { Route as AuthRouteImport } from './routes/_auth/route'
import { Route as AppRouteImport } from './routes/_app/route'
import { Route as PublicIndexImport } from './routes/_public/index'
import { Route as PublicAboutImport } from './routes/_public/about'
import { Route as AuthSignUpImport } from './routes/_auth/sign-up'
import { Route as AuthSignInImport } from './routes/_auth/sign-in'
import { Route as AppDashboardImport } from './routes/_app/dashboard'
import { Route as AppDashboardIndexImport } from './routes/_app/dashboard.index'
import { Route as AppDashboardUsersImport } from './routes/_app/dashboard.users'
import { Route as AppDashboardTodosImport } from './routes/_app/dashboard.todos'
import { Route as AppDashboardUsersIndexImport } from './routes/_app/dashboard.users.index'
import { Route as AppDashboardTodosIndexImport } from './routes/_app/dashboard.todos.index'
import { Route as AppDashboardUsersUserIdImport } from './routes/_app/dashboard.users.$userId'
import { Route as AppDashboardTodosTodoIdImport } from './routes/_app/dashboard.todos.$todoId'

// Create/Update Routes

const PublicRouteRoute = PublicRouteImport.update({
  id: '/_public',
  getParentRoute: () => rootRoute,
} as any)

const AuthRouteRoute = AuthRouteImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const AppRouteRoute = AppRouteImport.update({
  id: '/_app',
  getParentRoute: () => rootRoute,
} as any)

const PublicIndexRoute = PublicIndexImport.update({
  path: '/',
  getParentRoute: () => PublicRouteRoute,
} as any)

const PublicAboutRoute = PublicAboutImport.update({
  path: '/about',
  getParentRoute: () => PublicRouteRoute,
} as any)

const AuthSignUpRoute = AuthSignUpImport.update({
  path: '/sign-up',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AuthSignInRoute = AuthSignInImport.update({
  path: '/sign-in',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AppDashboardRoute = AppDashboardImport.update({
  path: '/dashboard',
  getParentRoute: () => AppRouteRoute,
} as any)

const AppDashboardIndexRoute = AppDashboardIndexImport.update({
  path: '/',
  getParentRoute: () => AppDashboardRoute,
} as any)

const AppDashboardUsersRoute = AppDashboardUsersImport.update({
  path: '/users',
  getParentRoute: () => AppDashboardRoute,
} as any)

const AppDashboardTodosRoute = AppDashboardTodosImport.update({
  path: '/todos',
  getParentRoute: () => AppDashboardRoute,
} as any)

const AppDashboardUsersIndexRoute = AppDashboardUsersIndexImport.update({
  path: '/',
  getParentRoute: () => AppDashboardUsersRoute,
} as any)

const AppDashboardTodosIndexRoute = AppDashboardTodosIndexImport.update({
  path: '/',
  getParentRoute: () => AppDashboardTodosRoute,
} as any)

const AppDashboardUsersUserIdRoute = AppDashboardUsersUserIdImport.update({
  path: '/$userId',
  getParentRoute: () => AppDashboardUsersRoute,
} as any)

const AppDashboardTodosTodoIdRoute = AppDashboardTodosTodoIdImport.update({
  path: '/$todoId',
  getParentRoute: () => AppDashboardTodosRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_app': {
      id: '/_app'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AppRouteImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthRouteImport
      parentRoute: typeof rootRoute
    }
    '/_public': {
      id: '/_public'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof PublicRouteImport
      parentRoute: typeof rootRoute
    }
    '/_app/dashboard': {
      id: '/_app/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AppDashboardImport
      parentRoute: typeof AppRouteImport
    }
    '/_auth/sign-in': {
      id: '/_auth/sign-in'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof AuthSignInImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/sign-up': {
      id: '/_auth/sign-up'
      path: '/sign-up'
      fullPath: '/sign-up'
      preLoaderRoute: typeof AuthSignUpImport
      parentRoute: typeof AuthRouteImport
    }
    '/_public/about': {
      id: '/_public/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof PublicAboutImport
      parentRoute: typeof PublicRouteImport
    }
    '/_public/': {
      id: '/_public/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof PublicIndexImport
      parentRoute: typeof PublicRouteImport
    }
    '/_app/dashboard/todos': {
      id: '/_app/dashboard/todos'
      path: '/todos'
      fullPath: '/dashboard/todos'
      preLoaderRoute: typeof AppDashboardTodosImport
      parentRoute: typeof AppDashboardImport
    }
    '/_app/dashboard/users': {
      id: '/_app/dashboard/users'
      path: '/users'
      fullPath: '/dashboard/users'
      preLoaderRoute: typeof AppDashboardUsersImport
      parentRoute: typeof AppDashboardImport
    }
    '/_app/dashboard/': {
      id: '/_app/dashboard/'
      path: '/'
      fullPath: '/dashboard/'
      preLoaderRoute: typeof AppDashboardIndexImport
      parentRoute: typeof AppDashboardImport
    }
    '/_app/dashboard/todos/$todoId': {
      id: '/_app/dashboard/todos/$todoId'
      path: '/$todoId'
      fullPath: '/dashboard/todos/$todoId'
      preLoaderRoute: typeof AppDashboardTodosTodoIdImport
      parentRoute: typeof AppDashboardTodosImport
    }
    '/_app/dashboard/users/$userId': {
      id: '/_app/dashboard/users/$userId'
      path: '/$userId'
      fullPath: '/dashboard/users/$userId'
      preLoaderRoute: typeof AppDashboardUsersUserIdImport
      parentRoute: typeof AppDashboardUsersImport
    }
    '/_app/dashboard/todos/': {
      id: '/_app/dashboard/todos/'
      path: '/'
      fullPath: '/dashboard/todos/'
      preLoaderRoute: typeof AppDashboardTodosIndexImport
      parentRoute: typeof AppDashboardTodosImport
    }
    '/_app/dashboard/users/': {
      id: '/_app/dashboard/users/'
      path: '/'
      fullPath: '/dashboard/users/'
      preLoaderRoute: typeof AppDashboardUsersIndexImport
      parentRoute: typeof AppDashboardUsersImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  AppRouteRoute: AppRouteRoute.addChildren({
    AppDashboardRoute: AppDashboardRoute.addChildren({
      AppDashboardTodosRoute: AppDashboardTodosRoute.addChildren({
        AppDashboardTodosTodoIdRoute,
        AppDashboardTodosIndexRoute,
      }),
      AppDashboardUsersRoute: AppDashboardUsersRoute.addChildren({
        AppDashboardUsersUserIdRoute,
        AppDashboardUsersIndexRoute,
      }),
      AppDashboardIndexRoute,
    }),
  }),
  AuthRouteRoute: AuthRouteRoute.addChildren({
    AuthSignInRoute,
    AuthSignUpRoute,
  }),
  PublicRouteRoute: PublicRouteRoute.addChildren({
    PublicAboutRoute,
    PublicIndexRoute,
  }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_app",
        "/_auth",
        "/_public"
      ]
    },
    "/_app": {
      "filePath": "_app/route.tsx",
      "children": [
        "/_app/dashboard"
      ]
    },
    "/_auth": {
      "filePath": "_auth/route.tsx",
      "children": [
        "/_auth/sign-in",
        "/_auth/sign-up"
      ]
    },
    "/_public": {
      "filePath": "_public/route.tsx",
      "children": [
        "/_public/about",
        "/_public/"
      ]
    },
    "/_app/dashboard": {
      "filePath": "_app/dashboard.tsx",
      "parent": "/_app",
      "children": [
        "/_app/dashboard/todos",
        "/_app/dashboard/users",
        "/_app/dashboard/"
      ]
    },
    "/_auth/sign-in": {
      "filePath": "_auth/sign-in.tsx",
      "parent": "/_auth"
    },
    "/_auth/sign-up": {
      "filePath": "_auth/sign-up.tsx",
      "parent": "/_auth"
    },
    "/_public/about": {
      "filePath": "_public/about.tsx",
      "parent": "/_public"
    },
    "/_public/": {
      "filePath": "_public/index.tsx",
      "parent": "/_public"
    },
    "/_app/dashboard/todos": {
      "filePath": "_app/dashboard.todos.tsx",
      "parent": "/_app/dashboard",
      "children": [
        "/_app/dashboard/todos/$todoId",
        "/_app/dashboard/todos/"
      ]
    },
    "/_app/dashboard/users": {
      "filePath": "_app/dashboard.users.tsx",
      "parent": "/_app/dashboard",
      "children": [
        "/_app/dashboard/users/$userId",
        "/_app/dashboard/users/"
      ]
    },
    "/_app/dashboard/": {
      "filePath": "_app/dashboard.index.tsx",
      "parent": "/_app/dashboard"
    },
    "/_app/dashboard/todos/$todoId": {
      "filePath": "_app/dashboard.todos.$todoId.tsx",
      "parent": "/_app/dashboard/todos"
    },
    "/_app/dashboard/users/$userId": {
      "filePath": "_app/dashboard.users.$userId.tsx",
      "parent": "/_app/dashboard/users"
    },
    "/_app/dashboard/todos/": {
      "filePath": "_app/dashboard.todos.index.tsx",
      "parent": "/_app/dashboard/todos"
    },
    "/_app/dashboard/users/": {
      "filePath": "_app/dashboard.users.index.tsx",
      "parent": "/_app/dashboard/users"
    }
  }
}
ROUTE_MANIFEST_END */
