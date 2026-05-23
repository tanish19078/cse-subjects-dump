const UI = {
    chart: null,

    setGridTexture(enabled) {
        document.body.classList.toggle("grid-off", !enabled);
        const toggle = document.getElementById("gridToggle");
        if (toggle) toggle.checked = enabled;
    },

    showView(viewName) {
        document.body.classList.toggle("study-open", viewName === "study");
        document.querySelectorAll(".view").forEach((view) => {
            view.classList.toggle("active", view.dataset.view === viewName);
        });
        document.querySelectorAll("[data-view-link]").forEach((button) => {
            button.classList.toggle("active", button.dataset.viewLink === viewName);
        });

        const titles = {
            dashboard: "Dashboard",
            deck: "Deck Manager",
            study: "Study Mode",
            statistics: "Statistics",
            settings: "Settings"
        };
        document.getElementById("pageTitle").textContent = titles[viewName] || "FlashMind";
        document.body.classList.remove("nav-open");
    },

    emptyState(title, message) {
        const template = document.getElementById("emptyStateTemplate");
        const node = template.content.cloneNode(true);
        node.querySelector("strong").textContent = title;
        node.querySelector("p").textContent = message;
        return node;
    },

    formatDate(value) {
        if (!value) return "Not reviewed";
        return new Intl.DateTimeFormat("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }).format(new Date(value));
    },

    renderMetrics(stats) {
        const metrics = [
            { label: "Total Cards", value: stats.totalCards, icon: "C" },
            { label: "Avg. Mastery", value: `${stats.masteryPercent}%`, icon: "%" },
            { label: "Study Sessions", value: stats.totalSessions, icon: "S" },
            { label: "Decks", value: stats.totalDecks, icon: "D" }
        ];

        document.getElementById("metricGrid").innerHTML = metrics.map((item) => `
            <article class="metric-card">
                <span>${item.icon}</span>
                <strong>${item.value}</strong>
                <p>${item.label}</p>
            </article>
        `).join("");
    },

    renderDecks(decks) {
        const grid = document.getElementById("deckGrid");
        grid.innerHTML = "";

        if (!decks.length) {
            grid.appendChild(this.emptyState("No decks yet", "Create your first subject deck to begin studying."));
            return;
        }

        decks.forEach((deck) => {
            const mastery = Store.getDeckMastery(deck);
            const card = document.createElement("article");
            card.className = "deck-card";
            card.tabIndex = 0;
            card.dataset.deckId = deck.id;
            card.innerHTML = `
                <div class="deck-card-top">
                    <span class="deck-pill" style="border-left: 5px solid ${deck.color}">
                        ${this.escape(deck.subject)}
                    </span>
                    <button class="kebab-button" type="button" tabindex="-1" aria-hidden="true">...</button>
                </div>
                <h3>${this.escape(deck.title)}</h3>
                <p>${this.escape(deck.description || "No description added yet.")}</p>
                <div class="deck-mastery-row">
                    <span>${deck.cards.length} card${deck.cards.length === 1 ? "" : "s"}</span>
                    <strong>${mastery}% Mastered</strong>
                </div>
                <div class="mini-progress">
                    <span style="width: ${mastery}%"></span>
                </div>
                <div class="deck-footer">
                    <span>Updated ${this.formatDate(deck.updatedAt)}</span>
                </div>
            `;
            grid.appendChild(card);
        });
    },

    renderDeckOptions(decks) {
        const select = document.getElementById("aiDeckSelect");
        if (!select) return;

        select.innerHTML = `
            <option value="__new__">Create new deck from topic</option>
            ${decks.map((deck) => `<option value="${deck.id}">${this.escape(deck.title)}</option>`).join("")}
        `;
    },

    renderGeneratedPreview(cards, sourceLabel, deckTitle) {
        const preview = document.getElementById("aiPreview");
        if (!preview) return;

        preview.innerHTML = `
            <article class="ai-preview-card ai-preview-summary">
                <span class="card-number">${this.escape(sourceLabel)}</span>
                <h3>${cards.length} flashcards added</h3>
                <p>Saved into ${this.escape(deckTitle)}. Open the deck to edit, delete, or study them.</p>
            </article>
            ${cards.slice(0, 3).map((card, index) => `
                <article class="ai-preview-card">
                    <span class="card-number">Card #${index + 1}</span>
                    <strong>${this.escape(card.front)}</strong>
                    <p>${this.escape(card.back)}</p>
                </article>
            `).join("")}
        `;
    },

    renderDeckDetail(deck) {
        document.getElementById("activeDeckDot").style.background = deck.color;
        document.getElementById("activeDeckSubject").textContent = deck.subject;
        document.getElementById("activeDeckTitle").textContent = deck.title;
        document.getElementById("activeDeckDescription").textContent = deck.description || "No description added yet.";
        document.getElementById("cardListTitle").textContent = `${deck.cards.length} card${deck.cards.length === 1 ? "" : "s"}`;
        const mastery = Store.getDeckMastery(deck);
        const reviewedCount = deck.cards.filter((card) => card.lastReviewedAt).length;
        document.getElementById("activeDeckCardCount").textContent = deck.cards.length;
        document.getElementById("activeDeckMastery").textContent = `${mastery}%`;
        document.getElementById("activeDeckProgressText").textContent = `${reviewedCount} / ${deck.cards.length} cards reviewed`;
        document.getElementById("activeDeckProgressFill").style.width = `${mastery}%`;

        const list = document.getElementById("cardList");
        list.innerHTML = "";
        if (!deck.cards.length) {
            list.appendChild(this.emptyState("No cards in this deck", "Add questions and answers to start studying."));
            return;
        }

        deck.cards.forEach((card, index) => {
            const row = document.createElement("div");
            row.className = "flashcard-row";
            row.innerHTML = `
                <div>
                    <span class="card-number">Card #${index + 1}</span>
                    <div class="flashcard-fields">
                        <div class="card-field">
                            <span>Front (Question)</span>
                            <p>${this.escape(card.front)}</p>
                        </div>
                        <div class="card-field">
                            <span>Back (Answer)</span>
                            <p>${this.escape(card.back)}</p>
                        </div>
                    </div>
                    <p class="review-note">Known ${card.knownCount} times. Missed ${card.unknownCount} times. Last reviewed: ${this.formatDate(card.lastReviewedAt)}</p>
                </div>
                <div class="row-actions">
                    <button class="icon-button" type="button" data-edit-card="${card.id}" aria-label="Edit card">
                        <span>Edit</span>
                    </button>
                    <button class="icon-button" type="button" data-delete-card="${card.id}" aria-label="Delete card">
                        <span>Del</span>
                    </button>
                </div>
            `;
            list.appendChild(row);
        });
    },

    renderSessions(state) {
        const list = document.getElementById("sessionList");
        list.innerHTML = "";

        if (!state.sessions.length) {
            list.appendChild(this.emptyState("No sessions yet", "Study a deck to create your first progress record."));
            return;
        }

        state.sessions.slice(0, 12).forEach((session) => {
            const item = document.createElement("div");
            item.className = "session-item";
            item.innerHTML = `
                <div>
                    <strong>${this.escape(session.deckTitle)}</strong>
                    <p>${this.formatDate(session.endedAt)} | ${session.knownCards}/${session.totalCards} known</p>
                </div>
                <span class="score-pill">${session.scorePercent}%</span>
            `;
            list.appendChild(item);
        });
    },

    renderChart(stats) {
        const canvas = document.getElementById("masteryChart");
        if (!canvas || typeof Chart === "undefined") return;

        if (this.chart) this.chart.destroy();
        this.chart = new Chart(canvas, {
            type: "doughnut",
            data: {
                labels: ["Known reviews", "Missed reviews"],
                datasets: [{
                    data: [stats.knownReviews, stats.unknownReviews],
                    backgroundColor: ["#00a3ff", "#ff6b6b"],
                    borderWidth: 0
                }]
            },
            options: {
                cutout: "68%",
                plugins: {
                    legend: {
                        position: "bottom",
                        labels: {
                            usePointStyle: true,
                            boxWidth: 8
                        }
                    }
                }
            }
        });
    },

    escape(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }
};
