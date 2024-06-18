// mutations.js
export const createNote = `
  mutation CreateNote($input: CreateNoteInput!) {
    createNote(input: $input) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const updateNote = `
  mutation UpdateNote($input: UpdateNoteInput!) {
    updateNote(input: $input) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const deleteNote = `
  mutation DeleteNote($input: DeleteNoteInput!) {
    deleteNote(input: $input) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
