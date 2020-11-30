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
