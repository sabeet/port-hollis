function ParseFrontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)/)
  if (!match) return { attributes: {}, body: text }

  const yamlBlock = match[1]
  const body = match[2]

  const attributes = {}
  yamlBlock.split("\n").forEach(line => {
    const [key, ...rest] = line.split(":")
    if (key && rest.length) {
      attributes[key.trim()] = rest.join(":").trim()
    }
  })

  return { attributes, body }
}

export default ParseFrontmatter