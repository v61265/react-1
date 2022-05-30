import { CompositeDecorator } from 'draft-js'
import { colorTextDecorator } from './color-text'
import { linkDecorator } from './link'

const decorators = new CompositeDecorator([colorTextDecorator, linkDecorator])

export default decorators
