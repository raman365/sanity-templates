export function SetupPanel() {
  return (
    <div className="setup-panel">
      <h2>Almost there — connect your repository</h2>
      <p>
        This gallery lists every branch of one GitHub repository as a template.
        Tell it which repo to use:
      </p>
      <ol>
        <li>
          Create <code>.env.local</code> in the project root:
          <pre>
            {'VITE_GITHUB_OWNER=your-github-username\nVITE_GITHUB_REPO=your-templates-repo'}
          </pre>
        </li>
        <li>Restart the dev server.</li>
        <li>
          Optional: in each template branch, add a <code>template.json</code>{' '}
          and a <code>cover.png</code> for a richer card:
          <pre>
            {JSON.stringify(
              {
                title: 'Portfolio Starter',
                description: 'A minimal portfolio powered by Sanity.',
                tags: ['portfolio', 'next.js'],
                demo: 'https://demo.example.com',
                cover: 'cover.png',
              },
              null,
              2,
            )}
          </pre>
        </li>
      </ol>
    </div>
  )
}
