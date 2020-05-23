import { Application } from 'https://deno.land/x/oak/mod.ts'
import router from './routes.ts'
const app = new Application()
const port = 8000

app.use(router.routes())
app.use(router.allowedMethods())

console.log(`server running on port ${port}`)
app.listen({ port})