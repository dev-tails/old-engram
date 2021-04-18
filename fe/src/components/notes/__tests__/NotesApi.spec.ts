import * as NotesApi from '../NotesApi';

describe("NotesApi", () => {
  describe("sortNotes", () => {
    it("should return single note with a parent not in list", () => {
      const notes = [
        {
          localId: "1",
          parent: "2",
        },
      ];
      const sortedNotes = NotesApi.sortNotes(notes);
      expect(sortedNotes.length).toBe(1);
      expect(sortedNotes[0].localId).toBe("1");
    });

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

    it("should sort notes with parents in visual order", () => {
      const notes = [
        {
          localId: "1",
        },
        {
          localId: "2",
          parent: "1",
        },
        {
          localId: "4",
          parent: "1",
          prev: "2",
        },
        {
          localId: "3",
          parent: "2",
        },
      ];
      const sortedNotes = NotesApi.sortNotes(notes);

      expect(sortedNotes.length).toBe(4);
      expect(sortedNotes[0].localId).toBe("1");
      expect(sortedNotes[1].localId).toBe("2");
      expect(sortedNotes[2].localId).toBe("3");
      expect(sortedNotes[3].localId).toBe("4");
    });

    it("should sort child notes by createdAt if prev doesn't exist", () => {
      const notes = [
        {
          localId: "1",
        },
        {
          localId: "2",
          parent: "1",
        },
        {
          localId: "3",
          parent: "2",
          createdAt: new Date("2021-04-01"),
        },
        {
          localId: "4",
          parent: "2",
          createdAt: new Date("2021-04-02"),
        },
      ];
      const sortedNotes = NotesApi.sortNotes(notes);

      expect(sortedNotes.length).toBe(4);
      expect(sortedNotes[0].localId).toBe("1");
      expect(sortedNotes[1].localId).toBe("2");
      expect(sortedNotes[2].localId).toBe("3");
      expect(sortedNotes[3].localId).toBe("4");
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

  describe("indentNote", () => {
    it("should set parent to note at index before it", () => {
      const note1 = {
        localId: "1",
      };
      const note2: any = {
        localId: "2",
      };

      const indentedNote = NotesApi.indentNote(1, [
        note1,
        note2,
      ] as NotesApi.Note[]);

      expect(note2.parent).toBeUndefined();
      expect(indentedNote.parent).toBe("1");
    });

    it("should set parent to first child of its parent", () => {
      const note1 = {
        localId: "1",
      };
      const note2: any = {
        localId: "2",
        parent: "1",
      };
      const note3: any = {
        localId: "3",
      };

      const indentedNote = NotesApi.indentNote(2, [
        note1,
        note2,
        note3,
      ] as NotesApi.Note[]);

      expect(indentedNote?.parent).toBe("1");
    });
  });

  describe("unindentNote", () => {
    it("should correctly unindent a note that is a child", () => {
      const note1 = {
        localId: "1",
      };
      const note2: any = {
        localId: "2",
        parent: "1",
      };

      const unindentedNote = NotesApi.unindentNote(1, [
        note1,
        note2,
      ] as NotesApi.Note[]);

      expect(unindentedNote?.parent).toBeUndefined();
    });

    it("should correctly unindent a note that is a child", () => {
      const note1 = {
        localId: "1",
        parent: "0",
      };
      const note2: any = {
        localId: "2",
        parent: "1",
      };

      const unindentedNote = NotesApi.unindentNote(1, [note1, note2] as Note[]);

      expect(unindentedNote.parent).toBe("0");
    });

    it("should correctly unindent a note that is a not an immediate child", () => {
      const note1 = {
        localId: "1",
        parent: "0",
      };
      const note2: any = {
        localId: "2",
        parent: "1",
      };
      const note3: any = {
        localId: "2",
        parent: "1",
      };

      const unindentedNote = NotesApi.unindentNote(2, [
        note1,
        note2,
        note3,
      ] as Note[]);

      expect(unindentedNote.parent).toBe("0");
    });
  });

  describe("getUpdatesToPositionNote", () => {
    it("should set prev to localId of newPrev", () => {
      const notes = [
        {
          localId: "1",
        },
        {
          localId: "2",
        },
      ];
      const updates = NotesApi.getUpdatesToPositionNote(
        notes[0],
        notes[1],
        notes
      );
      expect(updates.length).toBe(1);
      expect(updates[0].localId).toBe("1");
      expect(updates[0].prev).toBe("2");
    });

    it("should set parent to parent of newPrev", () => {
      const notes = [
        {
          localId: "1",
        },
        {
          localId: "2",
          parent: "0",
        },
      ];
      const updates = NotesApi.getUpdatesToPositionNote(
        notes[0],
        notes[1],
        notes
      );
      expect(updates.length).toBe(1);
      expect(updates[0].localId).toBe("1");
      expect(updates[0].prev).toBe("2");
      expect(updates[0].parent).toBe("0");
    });

    it("should set prev of note after newPrev to dropped note", () => {
      const notes = [
        {
          localId: "1",
        },
        {
          localId: "2",
        },
        {
          localId: "3",
          prev: "2",
        },
      ];
      const updates = NotesApi.getUpdatesToPositionNote(
        notes[0],
        notes[1],
        notes
      );
      expect(updates.length).toBe(2);
      expect(updates[0].localId).toBe("1");
      expect(updates[0].prev).toBe("2");
      expect(updates[1].localId).toBe("3");
      expect(updates[1].prev).toBe("1");
    });

    it("should set prev of note after newPrev to dropped note", () => {
      const notes = [
        {
          localId: "0",
        },
        {
          localId: "1",
          prev: "0",
        },
        {
          localId: "2",
          prev: "1",
        },
        {
          localId: "3",
        },
        // Moving localId 1 to here
      ];
      const updates = NotesApi.getUpdatesToPositionNote(
        notes[1],
        notes[3],
        notes
      );
      expect(updates.length).toBe(2);
      expect(updates[0].localId).toBe("1");
      expect(updates[0].prev).toBe("3");
      expect(updates[1].localId).toBe("2");
      expect(updates[1].prev).toBe("0");
    });
  });
});
