const byId = (id) => document.getElementById(id);

const safe = (value) => (value ?? "").toString().trim();

const statusClass = (status) => {
  const normalized = safe(status).toLowerCase();
  if (normalized === "live") return "status status-live";
  return "status status-source";
};

const textToHtml = (text) => {
  const element = document.createElement("span");
  element.textContent = text;
  return element.innerHTML;
};

function renderTags(container, tags) {
  container.innerHTML = "";
  tags.forEach((tag) => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = tag;
    container.appendChild(span);
  });
}

function renderProjectCard(project) {
  const stackBadges = (project.stack || [])
    .slice(0, 8)
    .map((tech) => `<span class="tag">${textToHtml(tech)}</span>`)
    .join("");

  const linkParts = [];
  if (project.links?.live) {
    linkParts.push(
      `<a href="${project.links.live}" target="_blank" rel="noreferrer">Live Demo</a>`
    );
  }
  if (project.links?.repo) {
    linkParts.push(
      `<a href="${project.links.repo}" target="_blank" rel="noreferrer">GitHub</a>`
    );
  }
  if (project.links?.api) {
    linkParts.push(
      `<a href="${project.links.api}" target="_blank" rel="noreferrer">API</a>`
    );
  }

  const buildItems = (project.build || [])
    .map((item) => `<li>${textToHtml(item)}</li>`)
    .join("");
  const impactItems = (project.impact || [])
    .map((item) => `<li>${textToHtml(item)}</li>`)
    .join("");

  return `
    <article class="project-card">
      <div class="project-top">
        <h3>${textToHtml(project.name)}</h3>
        <span class="${statusClass(project.status)}">${textToHtml(project.status)}</span>
      </div>
      <p>${textToHtml(project.problem)}</p>
      <p class="card-note">${textToHtml(project.stabilityNote)}</p>

      <section class="card-section">
        <h4>Build</h4>
        <ul class="card-list">${buildItems}</ul>
      </section>

      <section class="card-section">
        <h4>Impact</h4>
        <ul class="card-list">${impactItems}</ul>
      </section>

      <div class="stack">${stackBadges}</div>
      <div class="card-links">${linkParts.join("")}</div>
    </article>
  `;
}

function renderExperience(experience) {
  return experience
    .map((job) => {
      const points = (job.highlights || [])
        .map((item) => `<li>${textToHtml(item)}</li>`)
        .join("");
      return `
        <article class="experience-item">
          <div class="exp-meta">
            <strong>${textToHtml(job.company)} - ${textToHtml(job.title)}</strong>
            <span>${textToHtml(job.period)}</span>
          </div>
          <ul class="card-list">${points}</ul>
        </article>
      `;
    })
    .join("");
}

function setupRevealAnimation() {
  const items = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((item) => observer.observe(item));
}

async function loadPortfolio() {
  try {
    const response = await fetch("./projects.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Could not load project data.");
    }

    const data = await response.json();
    const owner = data.owner || {};

    byId("hero-name").textContent = safe(owner.name) || "Matthew Robin";
    byId("hero-role").textContent = safe(owner.role) || "Full-Stack Web Developer";
    byId("hero-summary").textContent = safe(owner.summary);
    byId("about-text").textContent = safe(owner.summary);

    byId("hero-github").href = safe(owner.github);
    byId("hero-email").href = `mailto:${safe(owner.email)}`;
    byId("contact-github").href = safe(owner.github);
    byId("contact-email").href = `mailto:${safe(owner.email)}`;

    renderTags(byId("highlights"), data.technicalHighlights || []);

    byId("project-grid").innerHTML = (data.projects || [])
      .map(renderProjectCard)
      .join("");

    byId("experience-list").innerHTML = renderExperience(data.experience || []);
  } catch (error) {
    byId("project-grid").innerHTML =
      '<p>Project data failed to load. Please refresh or check <code>projects.json</code>.</p>';
    console.error(error);
  } finally {
    byId("year").textContent = new Date().getFullYear().toString();
    setupRevealAnimation();
  }
}

loadPortfolio();
