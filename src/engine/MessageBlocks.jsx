import styles from './engine.module.css'

// Inline **bold** renderer — the only inline markup the engine supports.
export function InlineText({ text }) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**')
          ? <strong key={i}>{part.slice(2, -2)}</strong>
          : <span key={i}>{part}</span>
      )}
    </>
  )
}

// Renders a message's content blocks. ctaRow is rendered by the engine itself
// (it needs click handlers), so it is skipped here.
export default function MessageBlocks({ blocks }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === 'p') {
          return <p key={i} className={styles.blockP}><InlineText text={block.text} /></p>
        }
        if (block.type === 'bullets') {
          return (
            <ul key={i} className={styles.blockList}>
              {block.items.map((item, j) => (
                <li key={j}><InlineText text={item} /></li>
              ))}
            </ul>
          )
        }
        return null
      })}
    </>
  )
}
