declare module 'turndown' {
  interface TurndownServiceOptions {
    headingStyle?: 'atx' | 'setext'
    hr?: string
    bulletListMarker?: '*' | '-' | '+'
    codeBlockStyle?: 'indented' | 'fenced'
    fence?: string
    emDelimiter?: '_' | '*'
    strongDelimiter?: '**' | '__'
    linkStyle?: 'inlined' | 'referenced'
    linkReferenceStyle?: 'full' | 'shortcut' | 'collapsed'
    br?: string
    blankReplacement?(content: string, node: Node, options: TurndownServiceOptions): string
    keepReplacement?(content: string, node: Node, options: TurndownServiceOptions): string
    defaultReplacement?(content: string, node: Node, options: TurndownServiceOptions): string
  }

  class TurndownService {
    constructor(options?: TurndownServiceOptions)
    use(plugin: any): this
    addRule(key: string, rule: any): this
    removeRule(key: string): this
    keep(filter: any): this
    escape(str: string): string
    turndown(html: string): string
  }

  export = TurndownService
}
