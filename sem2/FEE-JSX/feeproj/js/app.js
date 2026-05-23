const App = {
    activeDeckId: null,
    study: null,

    init() {
        const state = Store.getState();
        UI.setGridTexture(state.settings.gridTexture !== false);
        this.bindEvents();
        this.refreshDashboard();
        UI.showView("dashboard");
    },

    bindEvents() {
        document.querySelectorAll("[data-view-link]").forEach((button) => {
            button.addEventListener("click", () => {
                const view = button.dataset.viewLink;
                if (view === "dashboard") this.refreshDashboard();
                if (view === "statistics") this.refreshStatistics();
                UI.showView(view);
            });
        });

        document.getElementById("mobileMenuBtn").addEventListener("click", () => {
            document.body.classList.toggle("nav-open");
        });

        document.getElementById("quickCreateDeckBtn").addEventListener("click", () => this.openDeckModal());
        document.getElementById("closeDeckModalBtn").addEventListener("click", () => document.getElementById("deckModal").close());
        document.getElementById("backToDashboardBtn").addEventListener("click", () => {
            this.refreshDashboard();
            UI.showView("dashboard");
        });

        document.getElementById("deckSearchInput").addEventListener("input", () => this.refreshDashboard());
        document.getElementById("deckSortSelect").addEventListener("change", () => this.refreshDashboard());
        document.getElementById("aiGeneratorForm").addEventListener("submit", (event) => this.generateFlashcards(event));
        document.getElementById("deckGrid").addEventListener("click", (event) => this.handleDeckGrid(event));
        document.getElementById("deckGrid").addEventListener("keydown", (event) => {
            if (event.key === "Enter") this.handleDeckGrid(event);
        });

        document.getElementById("deckForm").addEventListener("submit", (event) => this.saveDeck(event));
        document.getElementById("deleteDeckBtn").addEventListener("click", () => this.deleteActiveDeck());
        document.getElementById("editDeckBtn").addEventListener("click", () => {
            const deck = Store.getDeck(this.activeDeckId);
            if (deck) this.openDeckModal(deck);
        });

        document.getElementById("cardForm").addEventListener("submit", (event) => this.saveCard(event));
        document.getElementById("cancelCardEditBtn").addEventListener("click", () => this.resetCardForm());
        document.getElementById("cardList").addEventListener("click", (event) => this.handleCardActions(event));

        document.getElementById("startStudyBtn").addEventListener("click", () => this.startStudy());
        document.getElementById("studyCard").addEventListener("click", () => this.flipStudyCard());
        document.getElementById("endStudyBtn").addEventListener("click", () => this.finishStudy(false));
        document.getElementById("studyScorebar").addEventListener("click", (event) => this.scoreCurrentCard(event));
        document.getElementById("nextStudyCardBtn").addEventListener("click", () => this.advanceAfterFeedback());
        document.getElementById("explainWrongBtn").addEventListener("click", () => this.showWrongExplanation());

        document.getElementById("summaryBackBtn").addEventListener("click", () => {
            document.getElementById("summaryModal").close();
            this.openDeck(this.activeDeckId);
        });
        document.getElementById("summaryStatsBtn").addEventListener("click", () => {
            document.getElementById("summaryModal").close();
            this.refreshStatistics();
            UI.showView("statistics");
        });

        document.getElementById("gridToggle").addEventListener("change", (event) => {
            const gridTexture = event.target.checked;
            Store.updateSettings({ gridTexture });
            UI.setGridTexture(gridTexture);
        });

        document.getElementById("exportDataBtn").addEventListener("click", () => this.exportData());
        document.getElementById("importDataInput").addEventListener("change", (event) => this.importData(event));
        document.getElementById("clearDataBtn").addEventListener("click", () => this.clearData());
    },

    refreshDashboard() {
        const stats = Store.getStats();
        UI.renderMetrics(stats);
        const decks = Store.getDecks();
        UI.renderDeckOptions(decks);
        UI.renderDecks(this.getFilteredDecks());
    },

    getFilteredDecks() {
        const search = document.getElementById("deckSearchInput").value.trim().toLowerCase();
        const sort = document.getElementById("deckSortSelect").value;
        let decks = Store.getDecks().filter((deck) => {
            const haystack = `${deck.title} ${deck.description} ${deck.subject}`.toLowerCase();
            return haystack.includes(search);
        });

        decks = decks.sort((a, b) => {
            if (sort === "title") return a.title.localeCompare(b.title);
            if (sort === "cards") return b.cards.length - a.cards.length;
            if (sort === "mastery") return Store.getDeckMastery(b) - Store.getDeckMastery(a);
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        });

        return decks;
    },

    refreshStatistics() {
        const state = Store.getState();
        const stats = Store.getStats();
        UI.renderSessions(state);
        UI.renderChart(stats);
    },

    handleDeckGrid(event) {
        const card = event.target.closest("[data-deck-id]");
        if (!card) return;
        this.openDeck(card.dataset.deckId);
    },

    openDeck(deckId) {
        const deck = Store.getDeck(deckId);
        if (!deck) return;
        this.activeDeckId = deck.id;
        UI.renderDeckDetail(deck);
        this.resetCardForm();
        UI.showView("deck");
        window.scrollTo({ top: 0, behavior: "smooth" });
    },

    openDeckModal(deck = null) {
        const modal = document.getElementById("deckModal");
        document.getElementById("deckModalTitle").textContent = deck ? "Edit deck" : "Create deck";
        document.getElementById("deckIdInput").value = deck?.id || "";
        document.getElementById("deckTitleInput").value = deck?.title || "";
        document.getElementById("deckDescriptionInput").value = deck?.description || "";
        document.getElementById("deckSubjectInput").value = deck?.subject || "";
        document.getElementById("deckColorInput").value = deck?.color || "#2563eb";
        document.getElementById("deleteDeckBtn").style.display = deck ? "inline-flex" : "none";
        modal.showModal();
    },

    saveDeck(event) {
        event.preventDefault();
        const id = document.getElementById("deckIdInput").value;
        const data = {
            title: document.getElementById("deckTitleInput").value,
            description: document.getElementById("deckDescriptionInput").value,
            subject: document.getElementById("deckSubjectInput").value,
            color: document.getElementById("deckColorInput").value
        };

        if (!data.title.trim()) return;
        const deck = id ? Store.updateDeck(id, data) : Store.createDeck(data);
        document.getElementById("deckModal").close();
        if (deck) this.openDeck(deck.id);
        this.refreshDashboard();
    },

    deleteActiveDeck() {
        const id = document.getElementById("deckIdInput").value || this.activeDeckId;
        if (!id) return;
        const deck = Store.getDeck(id);
        if (!deck) return;

        const confirmed = confirm(`Delete "${deck.title}" and all of its cards?`);
        if (!confirmed) return;

        Store.deleteDeck(id);
        document.getElementById("deckModal").close();
        this.activeDeckId = null;
        this.refreshDashboard();
        UI.showView("dashboard");
    },

    saveCard(event) {
        event.preventDefault();
        if (!this.activeDeckId) return;

        const cardId = document.getElementById("cardIdInput").value;
        const data = {
            front: document.getElementById("cardFrontInput").value,
            back: document.getElementById("cardBackInput").value
        };
        if (!data.front.trim() || !data.back.trim()) return;

        if (cardId) Store.updateCard(this.activeDeckId, cardId, data);
        else Store.createCard(this.activeDeckId, data);

        this.openDeck(this.activeDeckId);
    },

    handleCardActions(event) {
        const editButton = event.target.closest("[data-edit-card]");
        const deleteButton = event.target.closest("[data-delete-card]");
        const deck = Store.getDeck(this.activeDeckId);
        if (!deck) return;

        if (editButton) {
            const card = deck.cards.find((item) => item.id === editButton.dataset.editCard);
            if (!card) return;
            document.getElementById("cardIdInput").value = card.id;
            document.getElementById("cardFrontInput").value = card.front;
            document.getElementById("cardBackInput").value = card.back;
            document.getElementById("cardSubmitText").textContent = "Update Card";
            return;
        }

        if (deleteButton) {
            const confirmed = confirm("Delete this card?");
            if (!confirmed) return;
            Store.deleteCard(this.activeDeckId, deleteButton.dataset.deleteCard);
            this.openDeck(this.activeDeckId);
        }
    },

    resetCardForm() {
        document.getElementById("cardForm").reset();
        document.getElementById("cardIdInput").value = "";
        document.getElementById("cardSubmitText").textContent = "Save Card";
    },

    async generateFlashcards(event) {
        event.preventDefault();
        const topic = document.getElementById("aiTopicInput").value.trim();
        const source = document.getElementById("aiSourceInput").value.trim();
        const count = Number(document.getElementById("aiCardCountInput").value) || 6;
        const deckChoice = document.getElementById("aiDeckSelect").value;
        const useGroq = document.getElementById("aiUseGroqInput").checked;
        const endpoint = document.getElementById("aiEndpointInput").value.trim();
        const model = document.getElementById("aiModelInput").value.trim() || "llama-3.1-8b-instant";
        const apiKey = document.getElementById("aiGroqKeyInput").value.trim();
        const status = document.getElementById("aiStatus");
        const button = document.getElementById("aiGenerateBtn");

        if (!topic) return;
        button.disabled = true;
        status.textContent = useGroq ? "Asking Groq Llama 3.1..." : "Generating offline cards...";

        let provider = "Offline generator";
        let cards = [];
        if (useGroq && apiKey) {
            try {
                const groqCards = await this.generateWithGroq({ endpoint, model, apiKey, topic, source, count });
                if (groqCards.length) {
                    cards = groqCards;
                    provider = `Groq ${model}`;
                }
            } catch {
                status.textContent = "Groq unavailable. Using offline generator...";
            }
        } else if (useGroq && !apiKey) {
            status.textContent = "Groq key missing. Using offline generator...";
        }

        if (!cards.length) {
            cards = this.generateOfflineCards(topic, source, count);
        }

        const cleanCards = cards
            .filter((card) => card.front && card.back)
            .slice(0, Math.max(2, Math.min(count, 12)));

        let deck = deckChoice === "__new__" ? null : Store.getDeck(deckChoice);
        if (!deck) {
            deck = Store.createDeck({
                title: topic,
                description: `AI-generated flashcards about ${topic}.`,
                subject: "AI Generated",
                color: "#00a3ff"
            });
        }

        const savedCards = Store.createCards(deck.id, cleanCards);
        status.textContent = `Added ${savedCards.length} cards to ${deck.title}.`;
        UI.renderGeneratedPreview(savedCards, provider, deck.title);
        this.refreshDashboard();
        button.disabled = false;
    },

    async generateWithGroq({ endpoint, model, apiKey, topic, source, count }) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 7000);
        const sourceBlock = source || `Generate from the topic name: ${topic}`;
        const prompt = `
Create ${count} high-quality flashcards for a student studying "${topic}".
Use the source below when available.

Return only valid JSON with this exact shape:
{"cards":[{"front":"question","back":"concise answer"}]}

Rules:
- Questions should test active recall.
- Answers should be short, clear, and exam-friendly.
- Avoid duplicate cards.

Source:
${sourceBlock}
`;

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model,
                    messages: [
                        {
                            role: "system",
                            content: "You generate clean JSON flashcards for students. Return only JSON."
                        },
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    temperature: 0.25,
                    response_format: { type: "json_object" }
                }),
                signal: controller.signal
            });
            if (!response.ok) throw new Error("Model request failed");
            const data = await response.json();
            return this.parseGeneratedCards(data.choices?.[0]?.message?.content || "", count);
        } finally {
            clearTimeout(timeout);
        }
    },

    parseGeneratedCards(rawText, count) {
        const jsonMatch = rawText.match(/\[[\s\S]*\]/);
        const objectMatch = rawText.match(/\{[\s\S]*\}/);
        if (!jsonMatch && !objectMatch) return [];
        try {
            const parsed = JSON.parse(objectMatch ? objectMatch[0] : jsonMatch[0]);
            const cards = Array.isArray(parsed) ? parsed : parsed.cards;
            if (!Array.isArray(cards)) return [];
            return cards
                .map((item) => ({
                    front: String(item.front || item.question || "").trim(),
                    back: String(item.back || item.answer || "").trim()
                }))
                .filter((item) => item.front && item.back)
                .slice(0, count);
        } catch {
            return [];
        }
    },

    generateOfflineCards(topic, source, count) {
        const text = source || topic;
        const sentences = text
            .replace(/\s+/g, " ")
            .split(/(?<=[.!?])\s+|\n+/)
            .map((sentence) => sentence.trim())
            .filter((sentence) => sentence.length > 18);
        const keywords = this.extractKeywords(`${topic} ${source}`);
        const cards = [];

        cards.push({
            front: `What is ${topic}?`,
            back: sentences[0] || `${topic} is the main concept for this generated study deck.`
        });
        cards.push({
            front: `Why is ${topic} important to remember?`,
            back: sentences[1] || `${topic} is important because it connects the key ideas, definitions, and examples in this topic.`
        });

        keywords.forEach((keyword, index) => {
            const sentence = sentences[index % Math.max(sentences.length, 1)];
            cards.push({
                front: `Explain ${keyword} in the context of ${topic}.`,
                back: sentence || `${keyword} is a key point related to ${topic}.`
            });
        });

        while (cards.length < count) {
            const cardNumber = cards.length + 1;
            cards.push({
                front: `What is one key takeaway from ${topic} #${cardNumber}?`,
                back: sentences[(cardNumber - 1) % Math.max(sentences.length, 1)] || `Review the main definition, purpose, and example connected to ${topic}.`
            });
        }

        return cards.slice(0, count);
    },

    extractKeywords(text) {
        const stopWords = new Set(["about", "after", "again", "also", "because", "before", "being", "between", "could", "every", "flashcards", "from", "have", "into", "main", "more", "must", "only", "other", "should", "source", "that", "their", "there", "these", "this", "topic", "using", "when", "where", "which", "with", "would"]);
        const words = text
            .toLowerCase()
            .match(/[a-z][a-z0-9-]{3,}/g) || [];
        const unique = [...new Set(words)]
            .filter((word) => !stopWords.has(word))
            .slice(0, 10);
        return unique.map((word) => word.replace(/(^|-)([a-z])/g, (match) => match.toUpperCase()));
    },

    startStudy() {
        const deck = Store.getDeck(this.activeDeckId);
        if (!deck || !deck.cards.length) {
            alert("Add at least one card before starting study mode.");
            return;
        }

        this.study = {
            deckId: deck.id,
            deckTitle: deck.title,
            startedAt: Store.now(),
            queue: [...deck.cards].sort(() => Math.random() - 0.5),
            index: 0,
            knownCards: 0,
            unknownCards: 0
        };

        UI.showView("study");
        this.renderStudyCard();
        window.scrollTo({ top: 0, behavior: "smooth" });
    },

    renderStudyCard() {
        const current = this.study.queue[this.study.index];
        const card = document.getElementById("studyCard");
        const scorebar = document.getElementById("studyScorebar");
        const feedback = document.getElementById("studyFeedback");
        card.classList.remove("is-flipped");
        scorebar.classList.remove("visible");
        feedback.classList.remove("visible", "feedback-known", "feedback-unknown");
        document.getElementById("studyExplanation").classList.add("hidden");
        this.study.pendingAdvance = false;

        document.getElementById("studyFrontText").textContent = current.front;
        document.getElementById("studyBackText").textContent = current.back;
        this.fitStudyText(document.getElementById("studyFrontText"), current.front);
        this.fitStudyText(document.getElementById("studyBackText"), current.back);
        document.getElementById("studyCounter").textContent = `${this.study.index + 1} / ${this.study.queue.length}`;
        document.getElementById("studyProgressFill").style.width = `${(this.study.index / this.study.queue.length) * 100}%`;
    },

    fitStudyText(element, text) {
        const length = text.trim().length;
        element.classList.remove("study-text-long", "study-text-dense", "study-text-compact");

        if (length > 520) {
            element.classList.add("study-text-compact");
        } else if (length > 280) {
            element.classList.add("study-text-dense");
        } else if (length > 140) {
            element.classList.add("study-text-long");
        }
    },

    flipStudyCard() {
        if (!this.study) return;
        document.getElementById("studyCard").classList.add("is-flipped");
        document.getElementById("studyScorebar").classList.add("visible");
    },

    scoreCurrentCard(event) {
        const button = event.target.closest("[data-score]");
        if (!button || !this.study) return;
        if (this.study.isScoring) return;
        this.study.isScoring = true;

        const current = this.study.queue[this.study.index];
        const result = button.dataset.score;
        Store.recordCardScore(this.study.deckId, current.id, result);
        if (result === "known") this.study.knownCards += 1;
        if (result === "unknown") this.study.unknownCards += 1;

        this.study.pendingAdvance = true;
        this.showStudyFeedback(result, current);

        if (result === "known") {
            setTimeout(() => this.advanceAfterFeedback(), 900);
        }
    },

    showStudyFeedback(result, card) {
        const feedback = document.getElementById("studyFeedback");
        const feedbackOrb = document.getElementById("feedbackOrb");
        const feedbackLabel = document.getElementById("feedbackLabel");
        const feedbackTitle = document.getElementById("feedbackTitle");
        const feedbackText = document.getElementById("feedbackText");
        const feedbackActions = document.getElementById("feedbackActions");
        const nextButton = document.getElementById("nextStudyCardBtn");
        document.getElementById("studyScorebar").classList.remove("visible");

        const isKnown = result === "known";
        feedback.classList.remove("feedback-known", "feedback-unknown");
        feedback.classList.add("visible", isKnown ? "feedback-known" : "feedback-unknown");
        feedbackOrb.textContent = isKnown ? "OK" : "Try";
        feedbackLabel.textContent = isKnown ? "Correct recall" : "Needs review";
        feedbackTitle.textContent = isKnown ? "Got it!" : "You'll get it next time";
        feedbackText.textContent = isKnown
            ? "Nice. This card is marked as known and the next card is coming up."
            : "No stress. Review the answer, open the explanation, then move to the next card.";
        feedbackActions.classList.toggle("hidden", isKnown);
        nextButton.textContent = this.study.index + 1 >= this.study.queue.length ? "Finish Session" : "Next Card";
        this.study.lastWrongCard = isKnown ? null : card;
    },

    showWrongExplanation() {
        if (!this.study?.lastWrongCard) return;
        const card = this.study.lastWrongCard;
        const panel = document.getElementById("studyExplanation");
        panel.classList.remove("hidden");
        panel.innerHTML = `
            <strong>Answer breakdown</strong>
            <p>The correct idea is: ${UI.escape(card.back)}</p>
            <p>Connect it back to the question: ${UI.escape(card.front)}</p>
            <p>Try saying the answer once without looking, then press Next Card.</p>
        `;
    },

    advanceAfterFeedback() {
        if (!this.study || !this.study.pendingAdvance) return;
        this.study.index += 1;
        this.study.pendingAdvance = false;
        this.study.isScoring = false;

        if (this.study.index >= this.study.queue.length) {
            this.finishStudy(true);
            return;
        }
        this.renderStudyCard();
    },

    finishStudy(saveSession) {
        if (!this.study) {
            this.openDeck(this.activeDeckId);
            return;
        }

        let session = null;
        if (saveSession) {
            session = Store.recordStudySession({
                deckId: this.study.deckId,
                deckTitle: this.study.deckTitle,
                startedAt: this.study.startedAt,
                totalCards: this.study.queue.length,
                knownCards: this.study.knownCards,
                unknownCards: this.study.unknownCards
            });
        }

        document.getElementById("studyProgressFill").style.width = "100%";
        if (session) this.showSummary(session);
        else this.openDeck(this.activeDeckId);
        this.study = null;
    },

    showSummary(session) {
        document.getElementById("summaryTitle").textContent = `${session.scorePercent}% recall score`;
        document.getElementById("summaryGrid").innerHTML = `
            <div class="summary-metric"><strong>${session.totalCards}</strong><span>Cards</span></div>
            <div class="summary-metric"><strong>${session.knownCards}</strong><span>Known</span></div>
            <div class="summary-metric"><strong>${session.unknownCards}</strong><span>Missed</span></div>
        `;
        document.getElementById("summaryModal").showModal();
    },

    exportData() {
        const blob = new Blob([JSON.stringify(Store.getState(), null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "flashmind-data.json";
        anchor.click();
        URL.revokeObjectURL(url);
    },

    importData(event) {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            try {
                const data = JSON.parse(reader.result);
                Store.replaceState(data);
                UI.setGridTexture(Store.getState().settings.gridTexture !== false);
                this.refreshDashboard();
                this.refreshStatistics();
                UI.showView("dashboard");
                alert("Data imported successfully.");
            } catch {
                alert("That JSON file could not be imported.");
            }
        };
        reader.readAsText(file);
        event.target.value = "";
    },

    clearData() {
        const confirmed = confirm("Clear all decks, cards, sessions, and settings?");
        if (!confirmed) return;
        Store.clearAll();
        UI.setGridTexture(true);
        this.activeDeckId = null;
        this.refreshDashboard();
        this.refreshStatistics();
        UI.showView("dashboard");
    }
};

document.addEventListener("DOMContentLoaded", () => App.init());
