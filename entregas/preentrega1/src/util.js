import {fileURLToPath} from 'url' // solo valido si trabajamos con type:module
import {dirname} from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname

// exporta ruta del directorio actual