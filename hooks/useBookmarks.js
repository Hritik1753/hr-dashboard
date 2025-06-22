import { create } from 'zustand';

const useBookmarks = create((set, get) => ({
  bookmarks: [],
  addBookmark: (employee) => {
    const existing = get().bookmarks.find((e) => e.id === employee.id);
    if (!existing) {
      set((state) => ({
        bookmarks: [...state.bookmarks, employee],
      }));
      }
      console.log(bookmakrs.length,"this is the length of the bookmarks")
  },
  removeBookmark: (id) =>
    set((state) => ({
      bookmarks: state.bookmarks.filter((e) => e.id !== id),
    })),
}));

export default useBookmarks;

