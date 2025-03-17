import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Bell, Moon, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight, CircleUser as UserCircle, CreditCard, Wallet } from 'lucide-react-native';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);

  const settingsSections = [
    {
      title: 'Conta',
      items: [
        {
          icon: <UserCircle size={24} color="#64748b" />,
          title: 'Perfil',
          subtitle: 'Editar informações pessoais',
          action: 'navigate',
        },
        {
          icon: <CreditCard size={24} color="#64748b" />,
          title: 'Métodos de Pagamento',
          subtitle: 'Gerenciar cartões e contas',
          action: 'navigate',
        },
        {
          icon: <Wallet size={24} color="#64748b" />,
          title: 'Categorias',
          subtitle: 'Personalizar categorias',
          action: 'navigate',
        },
      ],
    },
    {
      title: 'Preferências',
      items: [
        {
          icon: <Bell size={24} color="#64748b" />,
          title: 'Notificações',
          subtitle: 'Gerenciar alertas',
          action: 'switch',
          value: notifications,
          onValueChange: setNotifications,
        },
        {
          icon: <Moon size={24} color="#64748b" />,
          title: 'Modo Escuro',
          subtitle: 'Alterar tema do aplicativo',
          action: 'switch',
          value: darkMode,
          onValueChange: setDarkMode,
        },
      ],
    },
    {
      title: 'Segurança',
      items: [
        {
          icon: <Shield size={24} color="#64748b" />,
          title: 'Privacidade',
          subtitle: 'Configurações de segurança',
          action: 'navigate',
        },
      ],
    },
    {
      title: 'Suporte',
      items: [
        {
          icon: <HelpCircle size={24} color="#64748b" />,
          title: 'Ajuda',
          subtitle: 'Perguntas frequentes',
          action: 'navigate',
        },
      ],
    },
  ];

  const renderItem = (item: any) => {
    return (
      <TouchableOpacity
        key={item.title}
        style={styles.settingItem}
        onPress={() => {}}>
        <View style={styles.settingItemLeft}>
          {item.icon}
          <View style={styles.settingItemText}>
            <Text style={styles.settingItemTitle}>{item.title}</Text>
            <Text style={styles.settingItemSubtitle}>{item.subtitle}</Text>
          </View>
        </View>
        {item.action === 'switch' ? (
          <Switch
            value={item.value}
            onValueChange={item.onValueChange}
            trackColor={{ false: '#d1d5db', true: '#93c5fd' }}
            thumbColor={item.value ? '#2563eb' : '#f3f4f6'}
          />
        ) : (
          <ChevronRight size={20} color="#64748b" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Configurações</Text>
      </View>

      {settingsSections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionContent}>
            {section.items.map((item) => renderItem(item))}
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.logoutButton}>
        <LogOut size={24} color="#ef4444" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
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
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingItemText: {
    marginLeft: 16,
    flex: 1,
  },
  settingItemTitle: {
    fontSize: 16,
    color: '#1e293b',
    marginBottom: 2,
  },
  settingItemSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 32,
    padding: 16,
    backgroundColor: '#fef2f2',
    marginHorizontal: 20,
    borderRadius: 12,
  },
  logoutText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
});