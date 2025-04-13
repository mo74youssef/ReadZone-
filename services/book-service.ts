// Sample book data
export const books = {
  "1": {
    id: "1",
    title: "The Wife Upstairs",
    author: "Rachel Hawkins",
    coverImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1608144934-51hKpzo8MZL%201-8gXL9qTBjwVfkCTlmb0zXHl2MzqPYg.png",
    rating: 4.0,
    pages: 108,
    language: "Eng",
    description:
      "A delicious twist on a Gothic classic, The Wife Upstairs pairs Southern charm with atmospheric domestic suspense, perfect for fans of B.A. Paris and Megan Miranda.",
    authorBio:
      "Rachel Hawkins is the New York Times bestselling author of multiple books for young readers, and her work has been translated in over a dozen countries.",
    tags: ["romance", "fiction", "drama"],
    reviews: [
      { id: 1, user: "User1", rating: 5, text: "Amazing book, couldn't put it down!", date: "2 days ago" },
      { id: 2, user: "User2", rating: 4, text: "Great read, highly recommend.", date: "1 week ago" },
      { id: 3, user: "User3", rating: 5, text: "One of the best books I've read this year.", date: "2 weeks ago" },
    ],
    ratingStats: {
      average: 4.0,
      total: 52,
      distribution: [
        { stars: 5, count: 36, percentage: 70 },
        { stars: 4, count: 10, percentage: 20 },
        { stars: 3, count: 3, percentage: 5 },
        { stars: 2, count: 2, percentage: 3 },
        { stars: 1, count: 1, percentage: 2 },
      ],
    },
  },
  "2": {
    id: "2",
    title: "Someone Like You",
    author: "Roald Dahl",
    coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%2098-acJvyUHKQEUpSSMqs5reDozgltwFkK.png",
    rating: 4.2,
    pages: 320,
    language: "Eng",
    description:
      "Roald Dahl's unique blend of macabre humor and suspense has made him one of the most popular writers of our time. In Someone Like You, his first collection of short stories written for adults, we see Dahl at the height of his powers.",
    authorBio:
      "Roald Dahl was a British novelist, short-story writer, poet, screenwriter, and wartime fighter pilot. His books have sold more than 250 million copies worldwide.",
    tags: ["mystery", "thriller", "short stories"],
    reviews: [
      { id: 1, user: "BookLover", rating: 5, text: "Couldn't put it down! A perfect collection.", date: "1 week ago" },
      {
        id: 2,
        user: "MysteryFan",
        rating: 4,
        text: "Great plot twists and character development.",
        date: "2 weeks ago",
      },
    ],
    ratingStats: {
      average: 4.2,
      total: 45,
      distribution: [
        { stars: 5, count: 25, percentage: 55 },
        { stars: 4, count: 15, percentage: 33 },
        { stars: 3, count: 3, percentage: 7 },
        { stars: 2, count: 1, percentage: 2 },
        { stars: 1, count: 1, percentage: 2 },
      ],
    },
  },
  "3": {
    id: "3",
    title: "A Day of Fallen Night",
    author: "Samantha Shannon",
    coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%206-0ety4wHXPJmxxTSe2bvmN1Czp6H9en.png",
    rating: 4.5,
    pages: 458,
    language: "Eng",
    description:
      "The stunning, standalone prequel to the New York Times bestselling The Priory of the Orange Tree. In A Day of Fallen Night, Samantha Shannon sweeps readers back to the universe of The Priory of the Orange Tree, showing the events that shaped and changed the world.",
    authorBio:
      "Samantha Shannon is the New York Times and Sunday Times bestselling author of The Bone Season series and The Priory of the Orange Tree.",
    tags: ["fantasy", "fiction", "novel"],
    reviews: [
      { id: 1, user: "FantasyReader", rating: 5, text: "Shannon's best work yet!", date: "3 days ago" },
      { id: 2, user: "BookClubFan", rating: 4, text: "Dark, gritty, and compelling.", date: "1 month ago" },
    ],
    ratingStats: {
      average: 4.5,
      total: 78,
      distribution: [
        { stars: 5, count: 50, percentage: 64 },
        { stars: 4, count: 20, percentage: 26 },
        { stars: 3, count: 5, percentage: 6 },
        { stars: 2, count: 2, percentage: 3 },
        { stars: 1, count: 1, percentage: 1 },
      ],
    },
  },
  "4": {
    id: "4",
    title: "While Justice Sleeps",
    author: "Stacey Abrams",
    coverImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9780385546577%201-D8etWSsN3TXC2LTMooq1rByBNX12C7.png",
    rating: 4.3,
    pages: 423,
    language: "Eng",
    description:
      "From celebrated national leader and bestselling author Stacey Abrams, While Justice Sleeps is a gripping, complexly plotted thriller set within the halls of the U.S. Supreme Court.",
    authorBio:
      "Stacey Abrams is the New York Times bestselling author of Our Time Is Now and Lead from the Outside, an entrepreneur, and a political leader.",
    tags: ["drama", "fiction", "thriller"],
    reviews: [
      {
        id: 1,
        user: "ThrillerFan",
        rating: 5,
        text: "This book kept me on the edge of my seat!",
        date: "1 week ago",
      },
      { id: 2, user: "FictionFan", rating: 4, text: "Thought-provoking and suspenseful.", date: "3 weeks ago" },
    ],
    ratingStats: {
      average: 4.3,
      total: 92,
      distribution: [
        { stars: 5, count: 60, percentage: 65 },
        { stars: 4, count: 20, percentage: 22 },
        { stars: 3, count: 8, percentage: 9 },
        { stars: 2, count: 3, percentage: 3 },
        { stars: 1, count: 1, percentage: 1 },
      ],
    },
  },
  "5": {
    id: "5",
    title: "Great Expectations",
    author: "Charles Dickens",
    coverImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20107-sMgvRTWpCB0ChNlnOf0SIrOkvQ9VvB.png",
    rating: 4.1,
    pages: 234,
    language: "Eng",
    description:
      "Great Expectations is the thirteenth novel by Charles Dickens and his penultimate completed novel. It depicts the education of an orphan nicknamed Pip. It is Dickens's second novel, after David Copperfield, to be fully narrated in the first person.",
    authorBio:
      "Charles Dickens was an English writer and social critic. He created some of the world's best-known fictional characters and is regarded by many as the greatest novelist of the Victorian era.",
    tags: ["classic", "fiction", "coming-of-age"],
    reviews: [
      {
        id: 1,
        user: "ClassicLover",
        rating: 5,
        text: "A timeless classic that still resonates today.",
        date: "1 month ago",
      },
      { id: 2, user: "LiteraryFan", rating: 4, text: "Dickens at his finest.", date: "2 months ago" },
    ],
    ratingStats: {
      average: 4.1,
      total: 120,
      distribution: [
        { stars: 5, count: 60, percentage: 50 },
        { stars: 4, count: 30, percentage: 25 },
        { stars: 3, count: 20, percentage: 17 },
        { stars: 2, count: 5, percentage: 4 },
        { stars: 1, count: 5, percentage: 4 },
      ],
    },
  },
}

export type Book = (typeof books)[keyof typeof books]

// User collections (in a real app, these would be stored in a database)
const userFavorites: string[] = ["1", "3", "5"]
const userBookmarks: string[] = ["2", "4", "5"]
const userDownloads: string[] = ["1", "2", "5"]
let recentlyPlayed: string[] = ["3", "1", "4"] // Most recent first

// Event listeners for collection changes
const collectionChangeListeners: (() => void)[] = []

// Function to notify listeners when collections change
function notifyCollectionChange() {
  collectionChangeListeners.forEach((listener) => listener())
}

// Add a listener for collection changes
export function addCollectionChangeListener(listener: () => void) {
  collectionChangeListeners.push(listener)
  return () => {
    const index = collectionChangeListeners.indexOf(listener)
    if (index > -1) {
      collectionChangeListeners.splice(index, 1)
    }
  }
}

// Search function
export function searchBooks(query: string): Book[] {
  if (!query.trim()) return []

  const lowercaseQuery = query.toLowerCase().trim()

  return Object.values(books).filter(
    (book) => book.title.toLowerCase().includes(lowercaseQuery) || book.author.toLowerCase().includes(lowercaseQuery),
  )
}

// Get book by ID
export function getBookById(id: string): Book | null {
  return books[id as keyof typeof books] || null
}

// Get all books
export function getAllBooks(): Book[] {
  return Object.values(books)
}

// Get user's favorite books
export function getFavoriteBooks(): Book[] {
  return userFavorites.map((id) => books[id as keyof typeof books]).filter(Boolean) as Book[]
}

// Toggle favorite status
export function toggleFavorite(bookId: string): boolean {
  const index = userFavorites.indexOf(bookId)
  if (index > -1) {
    userFavorites.splice(index, 1)
    notifyCollectionChange()
    return false
  } else {
    userFavorites.push(bookId)
    notifyCollectionChange()
    return true
  }
}

// Check if book is favorited
export function isFavorite(bookId: string): boolean {
  return userFavorites.includes(bookId)
}

// Get user's bookmarked books
export function getBookmarkedBooks(): Book[] {
  return userBookmarks.map((id) => books[id as keyof typeof books]).filter(Boolean) as Book[]
}

// Toggle bookmark status
export function toggleBookmark(bookId: string): boolean {
  const index = userBookmarks.indexOf(bookId)
  if (index > -1) {
    userBookmarks.splice(index, 1)
    notifyCollectionChange()
    return false
  } else {
    userBookmarks.push(bookId)
    notifyCollectionChange()
    return true
  }
}

// Check if book is bookmarked
export function isBookmarked(bookId: string): boolean {
  return userBookmarks.includes(bookId)
}

// Get user's downloaded books
export function getDownloadedBooks(): Book[] {
  return userDownloads.map((id) => books[id as keyof typeof books]).filter(Boolean) as Book[]
}

// Add book to downloads
export function addToDownloads(bookId: string): boolean {
  if (!userDownloads.includes(bookId)) {
    userDownloads.push(bookId)
    notifyCollectionChange()
    return true
  }
  return false
}

// Remove book from downloads
export function removeFromDownloads(bookId: string): boolean {
  const index = userDownloads.indexOf(bookId)
  if (index > -1) {
    userDownloads.splice(index, 1)
    notifyCollectionChange()
    return true
  }
  return false
}

// Check if book is downloaded
export function isDownloaded(bookId: string): boolean {
  return userDownloads.includes(bookId)
}

// Get recently played books
export function getRecentlyPlayed(): Book[] {
  return recentlyPlayed.map((id) => books[id as keyof typeof books]).filter(Boolean) as Book[]
}

// Add book to recently played
export function addToRecentlyPlayed(bookId: string): void {
  // Remove if already exists
  const index = recentlyPlayed.indexOf(bookId)
  if (index > -1) {
    recentlyPlayed.splice(index, 1)
  }

  // Add to the beginning (most recent)
  recentlyPlayed.unshift(bookId)

  // Keep only the last 10 books
  if (recentlyPlayed.length > 10) {
    recentlyPlayed = recentlyPlayed.slice(0, 10)
  }

  notifyCollectionChange()
}
