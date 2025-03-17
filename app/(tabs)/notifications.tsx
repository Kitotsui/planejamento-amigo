import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Bell, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Info } from 'lucide-react-native';

type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'success' | 'info';
  date: string;
  read: boolean;
};

const notifications: Notification[] = [
  {
    id: '1',
    title: 'Meta Próxima de Conclusão',
    message: 'Sua meta "Viagem para Europa" está 80% concluída! Continue assim!',
    type: 'success',
    date: '2024-02-15 14:30',
    read: false,
  },
  {
    id: '2',
    title: 'Alerta de Orçamento',
    message: 'Você atingiu 90% do limite de gastos em "Alimentação" este mês.',
    type: 'warning',
    date: '2024-02-14 09:15',
    read: false,
  },
  {
    id: '3',
    title: 'Dica Financeira',
    message: 'Que tal revisar suas assinaturas mensais? Você pode economizar cancelando serviços não utilizados.',
    type: 'info',
    date: '2024-02-13 16:45',
    read: true,
  },
];

export default function NotificationsScreen() {
  const getIcon = (type: string, size: number, color: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle size={size} color={color} />;
      case 'success':
        return <CheckCircle size={size} color={color} />;
      case 'info':
        return <Info size={size} color={color} />;
      default:
        return <Bell size={size} color={color} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'warning':
        return '#f59e0b';
      case 'success':
        return '#10b981';
      case 'info':
        return '#3b82f6';
      default:
        return '#64748b';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notificações</Text>
      </View>

      <View style={styles.notificationsList}>
        {notifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={[
              styles.notificationCard,
              notification.read && styles.notificationCardRead,
            ]}>
            <View style={styles.notificationIcon}>
              {getIcon(notification.type, 24, getTypeColor(notification.type))}
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationMessage}>
                {notification.message}
              </Text>
              <Text style={styles.notificationDate}>{notification.date}</Text>
            </View>
          </TouchableOpacity>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  notificationsList: {
    padding: 20, },
  notificationCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  notificationCardRead: {
    opacity: 0.7,
  },
  notificationIcon: {
    marginRight: 16,
    padding: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
    lineHeight: 20,
  },
  notificationDate: {
    fontSize: 12,
    color: '#94a3b8',
  },
});