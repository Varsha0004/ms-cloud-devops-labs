import { describe, it, expect } from 'vitest';
import { buildNote, sortNotes, ValidationError, MAX_TITLE_LENGTH } from '../src/notes';
import type { Note } from '../src/notes';

describe('buildNote', () => {
  it('keeps the title and body it is given', () => {
    const note = buildNote({ title: 'Groceries', body: 'milk, eggs' });
    expect(note.title).toBe('Groceries');
    expect(note.body).toBe('milk, eggs');
  });

  it('trims surrounding whitespace from the title', () => {
    expect(buildNote({ title: '  spaced out  ', body: '' }).title).toBe('spaced out');
  });

  it('rejects an empty title', () => {
    expect(() => buildNote({ title: '   ', body: 'x' })).toThrow(ValidationError);
  });

  it('rejects a title longer than 80 characters', () => {
    expect(() => buildNote({ title: 'a'.repeat(81), body: '' })).toThrow(ValidationError);
  });

  it('defaults a missing body to an empty string', () => {
    expect(buildNote({ title: 'No body here' }).body).toBe('');
  });

  it('keeps a title of exactly the maximum length', () => {
    const title = 'a'.repeat(MAX_TITLE_LENGTH);
    expect(buildNote({ title, body: '' }).title).toBe(title);
  });
});

describe('sortNotes', () => {
  it('returns the newest note first', () => {
    const older: Note = { id: '1', title: 'old', body: '', createdAt: '2024-01-01T00:00:00.000Z' };
    const newer: Note = { id: '2', title: 'new', body: '', createdAt: '2024-06-01T00:00:00.000Z' };
    expect(sortNotes([older, newer])[0].id).toBe('2');
  });
});