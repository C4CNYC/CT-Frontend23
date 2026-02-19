/**
 * CSV/TSV Parser Utility for Student Import
 * Supports comma-separated and tab-separated values
 */

export interface ParsedStudent {
  email: string
  first_name: string
  last_name: string
  username?: string
  password?: string
  valid: boolean
  errors?: string[]
  rowIndex: number
}

export interface ValidationResult {
  valid: boolean
  errors: string[]
}

export interface ParseResult {
  students: ParsedStudent[]
  totalRows: number
  validCount: number
  invalidCount: number
}

/**
 * Generates a unique username from first and last name
 * Format: {firstname}.{lastname}{4-digit-random}
 * Example: john.doe1234
 */
export function generateUsername(firstName: string, lastName: string): string {
  const normalizedFirst = firstName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, '')
  const normalizedLast = lastName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, '')
  const randomDigits = Math.floor(1000 + Math.random() * 9000)
  return `${normalizedFirst}.${normalizedLast}${randomDigits}`
}

/**
 * Validates email format using regex
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

/**
 * Validates student data fields
 */
export function validateStudentData(
  student: Partial<Pick<ParsedStudent, 'email' | 'first_name' | 'last_name'>>
): ValidationResult {
  const errors: string[] = []

  if (!student.email || !student.email.trim()) {
    errors.push('Email is required')
  } else if (!isValidEmail(student.email)) {
    errors.push('Invalid email format')
  }

  if (!student.first_name || !student.first_name.trim()) {
    errors.push('First name is required')
  }

  if (!student.last_name || !student.last_name.trim()) {
    errors.push('Last name is required')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Detects delimiter in CSV content (comma, tab, or semicolon)
 */
function detectDelimiter(content: string): string {
  const lines = content.split('\n').slice(0, 10)
  let commaCount = 0
  let tabCount = 0
  let semicolonCount = 0

  for (const line of lines) {
    commaCount += (line.match(/,/g) || []).length
    tabCount += (line.match(/\t/g) || []).length
    semicolonCount += (line.match(/;/g) || []).length
  }

  if (tabCount > commaCount && tabCount > semicolonCount) return '\t'
  if (semicolonCount > commaCount) return ';'
  return ','
}

/**
 * Parses a single CSV/TSV line handling quoted values
 */
function parseCSVLine(line: string, delimiter: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const nextChar = line[i + 1]

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === delimiter && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }

  result.push(current.trim())

  return result
}

/**
 * Parses CSV/TSV file and returns student data
 * Expected columns (case-insensitive): email, firstname/e, lastname/e, username (optional), password (optional)
 */
export async function parseCSV(file: File): Promise<ParseResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        if (!content) {
          reject(new Error('Empty file'))
          return
        }

        const delimiter = detectDelimiter(content)
        const lines = content.split(/\r?\n/).filter((line) => line.trim())

        if (lines.length < 2) {
          reject(new Error('File must contain a header row and at least one data row'))
          return
        }

        // Parse header to find column indices
        const headerLine = parseCSVLine(lines[0], delimiter)
        const headerMap = new Map<string, number>()

        headerLine.forEach((col, index) => {
          const normalized = col.toLowerCase().trim()
          if (normalized === 'email') headerMap.set('email', index)
          else if (
            normalized === 'firstname' ||
            normalized === 'first_name' ||
            normalized === 'first name'
          )
            headerMap.set('first_name', index)
          else if (
            normalized === 'lastname' ||
            normalized === 'last_name' ||
            normalized === 'last name'
          )
            headerMap.set('last_name', index)
          else if (normalized === 'username') headerMap.set('username', index)
          else if (normalized === 'password') headerMap.set('password', index)
        })

        // Validate required columns
        if (
          !headerMap.has('email') ||
          !headerMap.has('first_name') ||
          !headerMap.has('last_name')
        ) {
          reject(
            new Error('Missing required columns. File must contain: email, firstname, lastname')
          )
          return
        }

        const students: ParsedStudent[] = []
        let validCount = 0

        // Parse data rows
        for (let i = 1; i < lines.length; i++) {
          const values = parseCSVLine(lines[i], delimiter)

          const email = values[headerMap.get('email')!] || ''
          const firstName = values[headerMap.get('first_name')!] || ''
          const lastName = values[headerMap.get('last_name')!] || ''
          const username = values[headerMap.get('username')] || undefined
          const password = values[headerMap.get('password')] || undefined

          const validation = validateStudentData({
            email,
            first_name: firstName,
            last_name: lastName,
          })

          const student: ParsedStudent = {
            email: email.trim(),
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            username: username?.trim() || generateUsername(firstName, lastName),
            password: password?.trim() || undefined,
            valid: validation.valid,
            errors: validation.valid ? undefined : validation.errors,
            rowIndex: i + 1,
          }

          if (student.valid) validCount++

          students.push(student)
        }

        resolve({
          students,
          totalRows: students.length,
          validCount,
          invalidCount: students.length - validCount,
        })
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}

/**
 * Filters out invalid students from parsed result
 */
export function getValidStudents(
  result: ParseResult
): Omit<ParsedStudent, 'valid' | 'errors' | 'rowIndex'>[] {
  return result.students
    .filter((s) => s.valid)
    .map(({ email, first_name, last_name, username, password }) => ({
      email,
      first_name,
      last_name,
      username,
      password,
    }))
}
