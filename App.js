import React, { useReducer, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native';

const initialTasks = [];

function taskReducer(tasks, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return [...tasks, { id: Date.now().toString(), text: action.payload }];
    case 'REMOVE_TASK':
      return tasks.filter(task => task.id !== action.payload);
    default:
      return tasks;
  }
}

export default function App() {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  const [taskText, setTaskText] = useState('');

  const addTask = () => {
    if (!taskText.trim()) {
      Alert.alert('Error', 'Task cannot be empty!');
      return;
    }
    dispatch({ type: 'ADD_TASK', payload: taskText });
    setTaskText('');
  };

  return (
      <View style={styles.container}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Tasks</Text>
        <View style={styles.inputContainer}>
          <TextInput
              style={styles.input}
              placeholder="e.g. buy captain morgan"
              value={taskText}
              onChangeText={setTaskText}
          />
          <Button title="ADD" onPress={addTask} />
        </View>

        <FlatList
            data={tasks}
            keyExtractor={item => item.id}
            ListEmptyComponent={<Text style={styles.emptyMessage}>It seems a bit empty here...</Text>}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => dispatch({ type: 'REMOVE_TASK', payload: item.id })}>
                  <Text style={styles.task}>{item.text}</Text>
                </TouchableOpacity>
            )}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 20,
    paddingTop: 80,
    backgroundColor: '#f8f8f8',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    paddingBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#000000',
    borderWidth: 2,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  task: {
    padding: 10,
    fontSize: 16,
    backgroundColor: '#e0e0e0',
    marginVertical: 5,
    textAlign: 'left',
    width: '100%',
  },
  emptyMessage: {
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});