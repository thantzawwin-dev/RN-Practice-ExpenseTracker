import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import AllExpenses from './screens/AllExpenses'
import ManageExpense from './screens/ManageExpense'
import RecentExpense from './screens/RecentExpense'
import { GlobalStyles } from './constants/styles'
import IconButton from '@/components/UI/IconButton'
import ExpensesContextProvider from '@/store/expenses-context'
import React from 'react'

export type RootStackParamList = {
  ExpensesOverview: undefined
  ManageExpense: {
    expenseId: string
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>()
const BottomTabs = createBottomTabNavigator()

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate('ManageExpense')
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="RecentExpense"
        component={RecentExpense}
        options={{
          title: 'Recent Expense',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => <Ionicons name="hourglass" color={color} size={size} />,
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" color={color} size={size} />,
        }}
      />
    </BottomTabs.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: GlobalStyles.colors.primary500,
              },
              headerTintColor: 'white',
            }}
          >
            <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} options={{ headerShown: false }} />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{
                presentation: 'modal',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
