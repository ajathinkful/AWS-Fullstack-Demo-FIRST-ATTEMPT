import React from 'react';
import logo from './logo.svg'; // Make sure logo.svg is in your project directory
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator, Button, Heading, Image, View, Card } from '@aws-amplify/ui-react';

function OriginalContent() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Hashi</h1>
        <p>This is a simple frontend demo.</p>
        <div>
          <button className="button">Button 1</button>
          <button className="button">Button 2</button>
        </div>
      </header>
    </div>
  );
}

function App({ signOut }) {
  return (
    <View className="App">
      <Card>
        <Image src={logo} className="App-logo" alt="logo" />
        <Heading level={1}>We now have Auth!</Heading>
      </Card>
      <Button onClick={signOut}>Sign Out</Button>
      <OriginalContent />
    </View>
  );
}

export default withAuthenticator(App);
