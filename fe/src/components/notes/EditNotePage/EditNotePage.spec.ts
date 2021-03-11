import { Note } from "../NotesApi";
import { indentNote, unindentNote } from "./EditNotePage";

describe("EditNotePage", () => {
  describe("indentNote", () => {
    it("should set parent to note at index before it", () => {
      const note1 = {
        _id: "1",
      };
      const note2: any = {
        _id: "2",
      };

      const indentedNote = indentNote(1, [note1, note2] as Note[]);

      expect(note2.parent).toBeUndefined();
      expect(indentedNote.parent).toBe("1");
    });

    it("should set parent to first child of its parent", () => {
      const note1 = {
        _id: "1",
      };
      const note2: any = {
        _id: "2",
        parent: "1",
      };
      const note3: any = {
        _id: "3",
      };

      const indentedNote = indentNote(2, [note1, note2, note3] as Note[]);

      expect(indentedNote.parent).toBe("1");
    });
  });

  describe("unindentNote", () => {
    it("should correctly unindent a note that is a child", () => {
      const note1 = {
        _id: "1",
      };
      const note2: any = {
        _id: "2",
        parent: "1",
      };

      const unindentedNote = unindentNote(1, [note1, note2] as Note[]);

      expect(unindentedNote.parent).toBeUndefined();
    });

    it("should correctly unindent a note that is a child", () => {
      const note1 = {
        _id: "1",
        parent: "0",
      };
      const note2: any = {
        _id: "2",
        parent: "1",
      };

      const unindentedNote = unindentNote(1, [note1, note2] as Note[]);

      expect(unindentedNote.parent).toBe("0");
    });

    it("should correctly unindent a note that is a not an immediate child", () => {
      const note1 = {
        _id: "1",
        parent: "0",
      };
      const note2: any = {
        _id: "2",
        parent: "1",
      };
      const note3: any = {
        _id: "2",
        parent: "1",
      };

      const unindentedNote = unindentNote(2, [note1, note2, note3] as Note[]);

      expect(unindentedNote.parent).toBe("0");
    });
  });
});
