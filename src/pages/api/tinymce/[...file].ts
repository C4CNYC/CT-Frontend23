import { promises as fs } from 'fs'
import path from 'path'

import { NextApiRequest, NextApiResponse } from 'next'

const allowedExtensions = ['.js', '.css', '.map']

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let file = ''
  if (req.query.file && typeof req.query.file == 'object') file = req.query.file.join('/')
  if (!file) return res.status(404).json({ error: 'File not found!' })

  try {
    const fileExt = path.extname(file)
    if (!allowedExtensions.includes(fileExt)) {
      return res.status(403).json({ error: 'Forbidden file type' })
    }

    const filePath = path.join(process.cwd(), 'node_modules', 'tinymce', file)

    const fileContent = await fs.readFile(filePath)
    const contentType = fileExt === '.js' ? 'application/javascript' : 'text/css'

    res.setHeader('Content-Type', contentType)
    res.send(fileContent)
  } catch (error) {
    res.status(404).json({ error: 'File not found' })
  }
}
