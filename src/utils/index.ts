export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result)
    }
    reader.onerror = error => reject(error)
  })
}

export function ddmmyyyyStringToIso(date: string, separator = "/") {
  const [dd, mm, yyyy] = date.split(separator)
  return `${yyyy}-${mm}-${dd}`
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function removeMongoAttrsFromDocument(doc: any) {
  delete doc.__v
  delete doc._id
}

// yyyy-mm-dd length === 10
export function yyyymmddToddmm(data?: string) {
  if (!data || data.length < 10) return ""
  const d = data.substring(0,10).split("-")
  return `${d[2]}/${d[1]}/${d[0]}`
}
