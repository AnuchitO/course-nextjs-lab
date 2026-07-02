import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// One server, reused by every test file that needs it — each test
// only overrides handlers for the specific case it's checking (see
// `server.use(...)` in PostsList.test.tsx) and resetHandlers() in
// afterEach restores the defaults for the next test.
export const server = setupServer(...handlers)
