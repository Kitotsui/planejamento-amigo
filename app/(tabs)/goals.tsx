import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Plus, Target } from 'lucide-react-native';

type Goal = {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
};

const categories = [
  'Emergência',
  'Viagem',
  'Educação',
  'Investimento',
  'Casa',
  'Carro',
  'Outros',
];

export default function GoalsScreen() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [category, setCategory] = useState('');
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Viagem para Europa',
      targetAmount: 15000,
      currentAmount: 5000,
      deadline: '2024-12-31',
      category: 'Viagem',
    },
    {
      id: '2',
      title: 'Fundo de Emergência',
      targetAmount: 10000,
      currentAmount: 7500,
      deadline: '2024-06-30',
      category: 'Emergência',
    },
  ]);

  const handleAddGoal = () => {
    if (!title || !targetAmount || !deadline || !category) return;

    const newGoal: Goal = {
      id: Date.now().toString(),
      title,
      targetAmount: parseFloat(targetAmount),
      currentAmount: 0,
      deadline,
      category,
    };

    setGoals([newGoal, ...goals]);
    setShowForm(false);
    setTitle('');
    setTargetAmount('');
    setDeadline('');
    setCategory('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Metas Financeiras</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowForm(!showForm)}>
          <Plus size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {showForm && (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Título da Meta"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Valor Alvo"
            value={targetAmount}
            onChangeText={setTargetAmount}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Data Limite (AAAA-MM-DD)"
            value={deadline}
            onChangeText={setDeadline}
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryList}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  category === cat && styles.categoryButtonActive,
                ]}
                onPress={() => setCategory(cat)}>
                <Text
                  style={[
                    styles.categoryButtonText,
                    category === cat && styles.categoryButtonTextActive,
                  ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleAddGoal}>
            <Text style={styles.submitButtonText}>Criar Meta</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.goalsList}>
        {goals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          return (
            <View key={goal.id} style={styles.goalCard}>
              <View style={styles.goalHeader}>
                <Text style={styles.goalTitle}>{goal.title}</Text>
                <Text style={styles.goalCategory}>{goal.category}</Text>
              </View>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[styles.progressFill, { width: `${progress}%` }]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {progress.toFixed(0)}% concluído
                </Text>
              </View>
              <View style={styles.goalFooter}>
                <View>
                  <Text style={styles.amountLabel}>Atual</Text>
                  <Text style={styles.currentAmount}>
                    R$ {goal.currentAmount.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.targetContainer}>
                  <Text style={styles.amountLabel}>Meta</Text>
                  <Text style={styles.targetAmount}>
                    R$ {goal.targetAmount.toFixed(2)}
                  </Text>
                </View>
                <View>
                  <Text style={styles.amountLabel}>Prazo</Text>
                  <Text style={styles.deadline}>{goal.deadline}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  addButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 8,
  },
  form: {
    backgroundColor: '#ffffff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  categoryList: {
    marginBottom: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#2563eb',
  },
  categoryButtonText: {
    color: '#64748b',
    fontSize: 14,
  },
  categoryButtonTextActive: {
    color: '#ffffff',
  },
  submitButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  goalsList: {
    padding: 20,
  },
  goalCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  goalCategory: {
    fontSize: 14,
    color: '#64748b',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'right',
  },
  goalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  amountLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  currentAmount: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '600',
  },
  targetContainer: {
    alignItems: 'center',
  },
  targetAmount: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '600',
  },
  deadline: {
    fontSize: 16,
    color: '#64748b',
  },
});