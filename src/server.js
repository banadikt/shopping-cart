const jsonServer = require('json-server');
const server = jsonServer.create()
const router = jsonServer.router('src/db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.post('/calculate-total', (req, res) => {
const cart = req.body
const total = cart.items.reduce((sum, item) =>
sum + (item.price * item.quantity), 0)
res.json({ total: total.toFixed(2) })
})

server.use(router)
server.listen(3001, () => {
console.log('JSON Server is running')
})
