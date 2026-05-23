const STORAGE_KEY = "flashmind_data_v1";

const demoState = {
    decks: [
        {
            id: "deck_js",
            title: "JavaScript Basics",
            description: "Core frontend concepts for quick revision.",
            subject: "Programming",
            color: "#00a3ff",
            createdAt: "2026-05-13T05:00:00.000Z",
            updatedAt: "2026-05-13T05:00:00.000Z",
            cards: [
                {
                    id: "card_dom",
                    front: "What is DOM manipulation?",
                    back: "Changing page elements, content, styles, or structure using JavaScript.",
                    knownCount: 0,
                    unknownCount: 0,
                    lastReviewedAt: null,
                    createdAt: "2026-05-13T05:00:00.000Z",
                    updatedAt: "2026-05-13T05:00:00.000Z"
                },
                {
                    id: "card_storage",
                    front: "What does localStorage do?",
                    back: "It stores key-value data in the browser so it remains after page reloads.",
                    knownCount: 0,
                    unknownCount: 0,
                    lastReviewedAt: null,
                    createdAt: "2026-05-13T05:00:00.000Z",
                    updatedAt: "2026-05-13T05:00:00.000Z"
                },
                {
                    id: "card_spa",
                    front: "What is a Single Page Application?",
                    back: "An app that updates views dynamically inside one HTML page without full page reloads.",
                    knownCount: 0,
                    unknownCount: 0,
                    lastReviewedAt: null,
                    createdAt: "2026-05-13T05:00:00.000Z",
                    updatedAt: "2026-05-13T05:00:00.000Z"
                }
            ]
        },
        {
            id: "deck_exam",
            title: "Exam Formulas",
            description: "A starter deck for memorizing short answers and definitions.",
            subject: "Education",
            color: "#00ccf9",
            createdAt: "2026-05-13T05:05:00.000Z",
            updatedAt: "2026-05-13T05:05:00.000Z",
            cards: [
                {
                    id: "card_recall",
                    front: "What is active recall?",
                    back: "A learning method where you test yourself by retrieving information from memory.",
                    knownCount: 0,
                    unknownCount: 0,
                    lastReviewedAt: null,
                    createdAt: "2026-05-13T05:05:00.000Z",
                    updatedAt: "2026-05-13T05:05:00.000Z"
                }
            ]
        }
    ],
    sessions: [],
    settings: {
        gridTexture: true
    }
};

const Store = {
    createId(prefix) {
        return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    },

    now() {
        return new Date().toISOString();
    },

    getState() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            this.saveState(demoState);
            return structuredClone(demoState);
        }

        try {
            const parsed = JSON.parse(stored);
            return {
                decks: parsed.decks || [],
                sessions: parsed.sessions || [],
                settings: { gridTexture: true, ...(parsed.settings || {}) }
            };
        } catch {
            this.saveState(demoState);
            return structuredClone(demoState);
        }
    },

    saveState(state) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },

    replaceState(nextState) {
        const safeState = {
            decks: Array.isArray(nextState.decks) ? nextState.decks : [],
            sessions: Array.isArray(nextState.sessions) ? nextState.sessions : [],
            settings: { gridTexture: true, ...(nextState.settings || {}) }
        };
        this.saveState(safeState);
        return safeState;
    },

    getDecks() {
        return this.getState().decks;
    },

    getDeck(deckId) {
        return this.getDecks().find((deck) => deck.id === deckId) || null;
    },

    createDeck(data) {
        const state = this.getState();
        const timestamp = this.now();
        const deck = {
            id: this.createId("deck"),
            title: data.title.trim(),
            description: data.description.trim(),
            subject: data.subject.trim() || "General",
            color: data.color || "#00a3ff",
            createdAt: timestamp,
            updatedAt: timestamp,
            cards: []
        };
        state.decks.unshift(deck);
        this.saveState(state);
        return deck;
    },

    updateDeck(deckId, data) {
        const state = this.getState();
        const deck = state.decks.find((item) => item.id === deckId);
        if (!deck) return null;

        deck.title = data.title.trim();
        deck.description = data.description.trim();
        deck.subject = data.subject.trim() || "General";
        deck.color = data.color || deck.color;
        deck.updatedAt = this.now();
        this.saveState(state);
        return deck;
    },

    deleteDeck(deckId) {
        const state = this.getState();
        state.decks = state.decks.filter((deck) => deck.id !== deckId);
        state.sessions = state.sessions.filter((session) => session.deckId !== deckId);
        this.saveState(state);
    },

    createCard(deckId, data) {
        const state = this.getState();
        const deck = state.decks.find((item) => item.id === deckId);
        if (!deck) return null;

        const timestamp = this.now();
        const card = {
            id: this.createId("card"),
            front: data.front.trim(),
            back: data.back.trim(),
            knownCount: 0,
            unknownCount: 0,
            lastReviewedAt: null,
            createdAt: timestamp,
            updatedAt: timestamp
        };
        deck.cards.unshift(card);
        deck.updatedAt = timestamp;
        this.saveState(state);
        return card;
    },

    createCards(deckId, cards) {
        const state = this.getState();
        const deck = state.decks.find((item) => item.id === deckId);
        if (!deck) return [];

        const timestamp = this.now();
        const newCards = cards.map((card) => ({
            id: this.createId("card"),
            front: card.front.trim(),
            back: card.back.trim(),
            knownCount: 0,
            unknownCount: 0,
            lastReviewedAt: null,
            createdAt: timestamp,
            updatedAt: timestamp
        }));
        deck.cards = [...newCards, ...deck.cards];
        deck.updatedAt = timestamp;
        this.saveState(state);
        return newCards;
    },

    updateCard(deckId, cardId, data) {
        const state = this.getState();
        const deck = state.decks.find((item) => item.id === deckId);
        const card = deck?.cards.find((item) => item.id === cardId);
        if (!deck || !card) return null;

        card.front = data.front.trim();
        card.back = data.back.trim();
        card.updatedAt = this.now();
        deck.updatedAt = this.now();
        this.saveState(state);
        return card;
    },

    deleteCard(deckId, cardId) {
        const state = this.getState();
        const deck = state.decks.find((item) => item.id === deckId);
        if (!deck) return;

        deck.cards = deck.cards.filter((card) => card.id !== cardId);
        deck.updatedAt = this.now();
        this.saveState(state);
    },

    recordCardScore(deckId, cardId, result) {
        const state = this.getState();
        const deck = state.decks.find((item) => item.id === deckId);
        const card = deck?.cards.find((item) => item.id === cardId);
        if (!deck || !card) return;

        if (result === "known") card.knownCount += 1;
        if (result === "unknown") card.unknownCount += 1;
        card.lastReviewedAt = this.now();
        deck.updatedAt = this.now();
        this.saveState(state);
    },

    recordStudySession(data) {
        const state = this.getState();
        const session = {
            id: this.createId("session"),
            deckId: data.deckId,
            deckTitle: data.deckTitle,
            startedAt: data.startedAt,
            endedAt: this.now(),
            totalCards: data.totalCards,
            knownCards: data.knownCards,
            unknownCards: data.unknownCards,
            scorePercent: data.totalCards ? Math.round((data.knownCards / data.totalCards) * 100) : 0
        };
        state.sessions.unshift(session);
        this.saveState(state);
        return session;
    },

    updateSettings(settings) {
        const state = this.getState();
        state.settings = { ...state.settings, ...settings };
        this.saveState(state);
        return state.settings;
    },

    clearAll() {
        localStorage.removeItem(STORAGE_KEY);
    },

    getStats() {
        const state = this.getState();
        const totalDecks = state.decks.length;
        const totalCards = state.decks.reduce((sum, deck) => sum + deck.cards.length, 0);
        const knownReviews = state.decks.reduce((sum, deck) => {
            return sum + deck.cards.reduce((cardSum, card) => cardSum + card.knownCount, 0);
        }, 0);
        const unknownReviews = state.decks.reduce((sum, deck) => {
            return sum + deck.cards.reduce((cardSum, card) => cardSum + card.unknownCount, 0);
        }, 0);
        const totalReviews = knownReviews + unknownReviews;

        return {
            totalDecks,
            totalCards,
            totalSessions: state.sessions.length,
            masteryPercent: totalReviews ? Math.round((knownReviews / totalReviews) * 100) : 0,
            knownReviews,
            unknownReviews
        };
    },

    getDeckMastery(deck) {
        const known = deck.cards.reduce((sum, card) => sum + card.knownCount, 0);
        const unknown = deck.cards.reduce((sum, card) => sum + card.unknownCount, 0);
        const total = known + unknown;
        return total ? Math.round((known / total) * 100) : 0;
    }
};
