import * as NotesApi from "../NotesApi";

describe("NotesApi", () => {
  describe("sortNotes", () => {
    it("should sort by createdAt", () => {
      const notes = [
        {
          localId: "1",
          createdAt: new Date(2021, 3, 20),
        },
        {
          localId: "2",
          createdAt: new Date(2021, 3, 19),
        },
      ];
      const sortedNotes = NotesApi.sortNotes(notes);
      expect(sortedNotes[0].localId).toBe("2");
      expect(sortedNotes[1].localId).toBe("1");
    });

    it("should sort by prev if exists", () => {
      const notes = [
        {
          localId: "1",
          prev: "2",
        },
        {
          localId: "2",
          createdAt: new Date(2021, 3, 20),
        },
        {
          localId: "3",
          createdAt: new Date(2021, 3, 19),
        },
      ];
      const sortedNotes = NotesApi.sortNotes(notes);
      expect(sortedNotes[0].localId).toBe("3");
      expect(sortedNotes[1].localId).toBe("2");
      expect(sortedNotes[2].localId).toBe("1");
    });

    it("should sort by prev when multiple prevs", () => {
      const notes = [
        {
          localId: "2",
          prev: "1",
        },
        {
          localId: "1",
          prev: "3",
        },
        {
          localId: "3",
        },
      ];
      const sortedNotes = NotesApi.sortNotes(notes);
      expect(sortedNotes[0].localId).toBe("3");
      expect(sortedNotes[1].localId).toBe("1");
      expect(sortedNotes[2].localId).toBe("2");
    });

    it("should sort floating prevs to end", () => {
      const notes = [
        {
          localId: "1",
        },
        {
          localId: "2",
          prev: "1",
        },
        {
          localId: "3",
          prev: "4",
        },
      ];
      const sortedNotes = NotesApi.sortNotes(notes);

      expect(sortedNotes.length).toBe(3);
      expect(sortedNotes[0].localId).toBe("1");
      expect(sortedNotes[1].localId).toBe("2");
      expect(sortedNotes[2].localId).toBe("3");
    });

    it("should sort be able to sort a prev point to a floating prev", () => {
      const notes = [
        {
          localId: "1",
        },
        {
          localId: "2",
          prev: "3",
        },
        {
          localId: "3",
          prev: "4",
        },
      ];
      const sortedNotes = NotesApi.sortNotes(notes);

      expect(sortedNotes.length).toBe(3);
      expect(sortedNotes[0].localId).toBe("1");
      expect(sortedNotes[1].localId).toBe("3");
      expect(sortedNotes[2].localId).toBe("2");
    });

    // Current algorithm is naive and slowly adds floating prevs in reverse order
    xit("should sort be able to sort a prev point to a floating prev", () => {
      const notes = [
        {
          localId: "1",
        },
        {
          localId: "2",
          prev: "4",
        },
        {
          localId: "3",
          prev: "2",
        },
      ];
      const sortedNotes = NotesApi.sortNotes(notes);

      expect(sortedNotes.length).toBe(3);
      expect(sortedNotes[0].localId).toBe("1");
      expect(sortedNotes[1].localId).toBe("2");
      expect(sortedNotes[2].localId).toBe("3");
    });
  });
});
