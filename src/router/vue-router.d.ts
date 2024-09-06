import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    showHeaderAction?: boolean
    hideHeader?: boolean
  }
}
