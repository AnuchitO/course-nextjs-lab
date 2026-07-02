import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import { CartProvider } from '@/components/examples/07-context-provider/CartContext'

// Best practice: instead of wrapping every provider in every test file,
// define one custom `render` here that already includes every provider
// the app needs at runtime (context providers, theme, i18n, a router
// stub, ...). Test files then import `render` from this file instead
// of '@testing-library/react', and every component they render is
// automatically inside the right tree.
function AllProviders({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>
}

function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(ui, { wrapper: AllProviders, ...options })
}

export * from '@testing-library/react'
export { customRender as render }
