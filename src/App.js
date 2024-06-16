import React, { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import { GraphQLAPI as API } from "@aws-amplify/api-graphql";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { listNotes } from "./graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "./graphql/mutations";

// Configure Amplify with the GraphQL API
Amplify.configure({
  API: {
    GraphQL: {
      endpoint: 'https://gu6dmxte2nh5jhraxivx5yo4cu.appsync-api.us-east-1.amazonaws.com/graphql',
      region: 'us-east-1',
      defaultAuthMode: 'apiKey',
      apiKey: 'da2-y5v3u3fnq5hzhecyallqhecwky'
    }
  }
});

const App = ({ signOut }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      const apiData = await API.graphql({ query: listNotes });
      const notesFromAPI = apiData.data.listNotes.items;
      setNotes(notesFromAPI);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      name: form.get("name"),
      description: form.get("description"),
    };

    try {
      await API.graphql({
        query: createNoteMutation,
        variables: { input: data },
      });
      fetchNotes();
      event.target.reset();
    } catch (error) {
      console.error("Error creating note:", error);
    }
  }

  async function deleteNote({ id }) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);

    try {
      await API.graphql({
        query: deleteNoteMutation,
        variables: { input: { id } },
      });
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  return (
    <View className="App">
      <Heading level={1}>My Notes App</Heading>
      <View as="form" margin="3rem 0" onSubmit={createNote}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="name"
            placeholder="Note Name"
            label="Note Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="description"
            placeholder="Note Description"
            label="Note Description"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Create Note
          </Button>
        </Flex>
      </View>
      <Heading level={2}>Current Notes</Heading>
      <View margin="3rem 0">
        {notes.map((note) => (
          <Flex
            key={note.id || note.name}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {note.name}
            </Text>
            <Text as="span">{note.description}</Text>
            <Button variation="link" onClick={() => deleteNote(note)}>
              Delete note
            </Button>
          </Flex>
        ))}
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);
