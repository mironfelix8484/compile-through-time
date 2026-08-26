const CONTACT_EMAIL_PLACEHOLDER = "contact@felixmiron.dev";

export function SiteInformation() {
  return (
    <div className="site-information">
      <section className="record-section" id="about-project" aria-labelledby="project-record-heading">
        <div className="record-label">
          <span>PROJECT RECORD</span>
          <span>001</span>
        </div>
        <div className="record-content">
          <h2 id="project-record-heading">About this project</h2>
          <p className="record-lede">
            Compile Through Time reconstructs the moment a developer first sees a program successfully build or run
            across different computing eras.
          </p>
          <p>
            Each workspace is assembled from historical evidence and documented assumptions. This is a researched
            visual reconstruction—not an emulator or a browser-based development environment.
          </p>
        </div>
      </section>

      <section className="record-section" id="architecture" aria-labelledby="system-notes-heading">
        <div className="record-label">
          <span>SYSTEM NOTES</span>
          <span>002</span>
        </div>
        <div className="record-content">
          <h2 id="system-notes-heading">How the exhibit is assembled</h2>
          <p className="record-lede">
            The interface and the historical records are kept separate, allowing the same researched material to be
            presented consistently in local development and in production.
          </p>
          <ol className="system-flow" aria-label="System architecture">
            <li><strong>React + TypeScript</strong><span>Timeline and reconstructed workspaces</span></li>
            <li><strong>REST API</strong><span>Environment records and compilation transcripts</span></li>
            <li className="runtime-step">
              <span><strong>Node + Express</strong><small>Local development</small></span>
              <span><strong>Cloudflare Worker</strong><small>Production</small></span>
            </li>
            <li><strong>Historical artifacts</strong><span>Scenarios, evidence, and transcripts bundled as static records</span></li>
          </ol>
          <p>
            Modular services, providers, and runtime-specific artifact loaders keep the application portable without
            adding a database or persistence service.
          </p>
        </div>
      </section>

      <section className="record-section creator-record" id="about-felix" aria-labelledby="creator-heading">
        <div className="record-label">
          <span>CREATOR</span>
          <span>003</span>
        </div>
        <div className="record-content">
          <h2 id="creator-heading">Félix Miron</h2>
          <p className="record-lede">
            Software developer based in Montréal, Canada, building web applications and software systems with an
            emphasis on clear architecture, durable interfaces, and considered user experiences.
          </p>
          <nav className="professional-links" aria-label="Professional links">
            <a href="/felix-miron-resume.pdf" target="_blank" rel="noreferrer">Résumé / CV</a>
            <a href="https://github.com/mironfelix8484" target="_blank" rel="noreferrer">GitHub</a>
            <a href={`mailto:${CONTACT_EMAIL_PLACEHOLDER}`}>Contact <span>(placeholder)</span></a>
          </nav>
        </div>
      </section>
    </div>
  );
}
