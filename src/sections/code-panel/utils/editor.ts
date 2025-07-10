import { indentService } from '@codemirror/language'
import { Compartment } from '@codemirror/state'

export const indentCompartment = new Compartment()

export const noAutoIndent = indentService.of(() => null)
