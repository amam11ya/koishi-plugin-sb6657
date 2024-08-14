import { readFileSync } from 'fs'
import { join } from 'path'
import { Context, h, Random, Schema } from 'koishi'

export const name = 'sb6657'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

async function getData() {
  const dataObject = JSON.parse(
    readFileSync(join(__dirname, '/assets/6657data.json'), 'utf8'),
  )
  return Object.values(dataObject).flat()
}

export function apply(ctx: Context) {
  // write your plugin here
  ctx.command('sb6657', '生成6657烂梗').action(async (props) => {
    const data = await getData()
    const { session } = props
    const msg = [h('text', { content: `${Random.pick(data)}` })]
    session.send(msg)
  })
}
