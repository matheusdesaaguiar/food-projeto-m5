import crypto from 'crypto'

// 1. Definindo tipos para os dados criptografáveis
type EncryptableData = Record<string, unknown> | string | number | boolean

// 2. Verificação segura da chave
const getValidatedSecretKey = (): Buffer => {
  const secretKey = process.env.CRYPTO_SECRET_KEY
  
  if (!secretKey) {
    throw new Error('CRYPTO_SECRET_KEY não definida no .env')
  }
  
  // Converte para Buffer garantindo 32 bytes
  const keyBuffer = Buffer.from(secretKey, 'utf-8')
  
  if (keyBuffer.length !== 32) {
    throw new Error('CRYPTO_SECRET_KEY deve ter exatamente 32 bytes')
  }
  
  return keyBuffer
}

const algorithm = 'aes-256-cbc'
const secretKey = getValidatedSecretKey()

// 3. Função encrypt com tipagem segura
export function encrypt(data: EncryptableData): string {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv)
  
  const dataToEncrypt = typeof data === 'string' ? data : JSON.stringify(data)
  
  let encrypted = cipher.update(dataToEncrypt, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  
  return `${iv.toString('hex')}:${encrypted}`
}

// 4. Função decrypt com tipagem segura
export function decrypt<T = unknown>(text: string): T {
  const [ivHex, encryptedHex] = text.split(':')
  
  if (!ivHex || !encryptedHex) {
    throw new Error('Texto criptografado em formato inválido')
  }
  
  const iv = Buffer.from(ivHex, 'hex')
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv)
  
  let decrypted = decipher.update(encryptedHex, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  
  try {
    return typeof decrypted === 'string' && 
           (decrypted.startsWith('{') || decrypted.startsWith('['))
      ? JSON.parse(decrypted)
      : decrypted as T
  } catch (error) {
    throw new Error('Falha ao decriptar dados: ' + (error instanceof Error ? error.message : String(error)))
  }
}