import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Plus, TrendingUp } from 'lucide-react-native';

type Income = {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
};

const categories = [
  'Salário',
  'Freelance',
  'Investimentos',
  'Aluguel',
  'Outros',
];

export default function IncomeScreen() {
  const [showForm, setShowForm] = useState(false);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [incomes, setIncomes] = useState<Income[]>([
    {
      id: '1',
      description: 'Salário Mensal',
      amount: 5000.00,
      category: 'Salário',
      date: '2024-02-05',
    },
    {
      id: '2',
      description: 'Projeto Freelance',
      amount: 2500.00,
      category: 'Freelance',
      date: '2024-02-10',
    },
  ]);

  const handleAddIncome = () => {
    if (!description || !amount || !category) return;

    const newIncome: Income = {
      id: Date.now().toString(),
      description,
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString().split('T')[0],
    };

    setIncomes([newIncome, ...incomes]);
    setShowForm(false);
    setDescription('');
    setAmount('');
    setCategory('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Receitas</Text>
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
            placeholder="Descrição"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Valor"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
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
            onPress={handleAddIncome}>
            <Text style={styles.submitButtonText}>Adicionar Receita</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.incomesList}>
        {incomes.map((income) => (
          <View key={income.id} style={styles.incomeCard}>
            <View style={styles.incomeHeader}>
              <Text style={styles.incomeDescription}>{income.description}</Text>
              <Text style={styles.incomeAmount}>
                R$ {income.amount.toFixed(2)}
              </Text>
            </View>
            <View style={styles.incomeFooter}>
              <Text style={styles.incomeCategory}>{income.category}</Text>
              <Text style={styles.incomeDate}>{income.date}</Text>
            </View>
          </View>
        ))}
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
  incomesList: {
    padding: 20,
  },
  incomeCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  incomeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  incomeDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  incomeAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10b981',
  },
  incomeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  incomeCategory: {
    fontSize: 14,
    color: '#64748b',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  incomeDate: {
    fontSize: 14,
    color: '#64748b',
  },
});