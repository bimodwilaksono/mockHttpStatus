import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { env } from 'hono/adapter'
import { prettyJSON } from 'hono/pretty-json'

const app = new Hono()

app.use(prettyJSON({ space: 2 })) // With options: prettyJSON({ space: 4 })

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const apiStatus = app.basePath('/status')

apiStatus.get('/:code', (c) => {
  const code = parseInt(c.req.param('code'))

  if (isNaN(code) || code < 100 || code > 599) {
    return c.text('Invalid status code', 400)
  }

  return c.json({
    message: "This is message response",
    response: code,
    result: null,
  })
})

const port = parseInt(process.env.PORT!) || 3113

serve({
  fetch: app.fetch,
  port
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
