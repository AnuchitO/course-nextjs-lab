import { useLocalStorage } from './useLocalStorage'

// A real scenario for reactive localStorage: an autosaving comment
// box, like GitHub's or Gmail's. Every keystroke is persisted, so
// refreshing the page (or the tab crashing) never loses a draft — and
// if this same page is open in a second tab, useLocalStorage's
// "storage" event listener means typing here updates the draft there
// too, live.
export function DraftCommentDemo() {
  const [draft, setDraft] = useLocalStorage('draft-comment', '')

  return (
    <div>
      <h3>Autosaving draft (useLocalStorage, real scenario)</h3>
      <textarea
        aria-label="draft-comment"
        rows={3}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Write a comment... it's saved as you type"
      />
      <p data-testid="draft-status">
        {draft ? 'Draft saved' : 'Nothing typed yet'}
      </p>
      <button onClick={() => setDraft('')} disabled={!draft}>
        Discard draft
      </button>
    </div>
  )
}
