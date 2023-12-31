import http from 'node:http'
import { jason } from './middlewares/jason.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'



const server = http.createServer(async(req, res) => {
  const {method, url} = req

  await jason(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)
    const { query, ...params } = routeParams.groups
    // console.log(extractQueryParams(routeParams.groups.query))

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)