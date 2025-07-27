import { QuizQuestion } from '@/types/quiz';

export const quizQuestions: Record<string, QuizQuestion> = {
  welcome: {
    id: 'welcome',
    type: 'singleChoice',
    question: 'Welcome to Overang AI Health Platform! Let\'s start with some basic information to personalize your experience.',
    options: [
      { id: 'start', label: 'Let\'s get started', value: 'start' }
    ],
    next: 'age'
  },
  
  age: {
    id: 'age',
    type: 'slider',
    question: 'Select your age',
    description: 'This helps us provide age-appropriate recommendations',
    validation: { min: 18, max: 100, required: true },
    next: 'weight'
  },
  
  weight: {
    id: 'weight',
    type: 'numberInput',
    question: 'What is your current weight?',
    description: 'Please enter your weight in pounds (lbs)',
    validation: { min: 10, max: 300, required: true },
    next: 'activity'
  },
  
  activity: {
    id: 'activity',
    type: 'singleChoice',
    question: 'How would you describe your current activity level?',
    options: [
      { id: 'sedentary', label: 'Sedentary (little to no exercise)', value: 'sedentary' },
      { id: 'light', label: 'Lightly active (light exercise 1-3 days/week)', value: 'light' },
      { id: 'moderate', label: 'Moderately active (moderate exercise 3-5 days/week)', value: 'moderate' },
      { id: 'very', label: 'Very active (hard exercise 6-7 days/week)', value: 'very' },
      { id: 'extra', label: 'Extra active (very hard exercise, physical job)', value: 'extra' }
    ],
    next: 'nutrition'
  },
  
  nutrition: {
    id: 'nutrition',
    type: 'multiChoice',
    question: 'Which of these nutrition goals are important to you?',
    description: 'Select all that apply',
    options: [
      { id: 'weight_loss', label: 'Weight loss', value: 'weight_loss' },
      { id: 'muscle_gain', label: 'Muscle gain', value: 'muscle_gain' },
      { id: 'energy', label: 'Increased energy', value: 'energy' },
      { id: 'heart_health', label: 'Heart health', value: 'heart_health' },
      { id: 'diabetes', label: 'Blood sugar management', value: 'diabetes' },
      { id: 'general', label: 'General wellness', value: 'general' }
    ],
    next: 'conditions'
  },
  
  conditions: {
    id: 'conditions',
    type: 'multiChoice',
    question: 'Multiple choice conditions',
    description: 'Identify medical conditions that you may apply to you',
    options: [
      { id: 'high_bp', label: 'High blood pressure', value: 'high_bp' },
      { id: 'high_glucose', label: 'High glucose', value: 'high_glucose' },
      { id: 'migraines', label: 'Migraines', value: 'migraines' },
      { id: 'arthritis', label: 'Arthritis', value: 'arthritis' },
      { id: 'depression', label: 'Depression', value: 'depression' },
      { id: 'anxiety', label: 'Anxiety', value: 'anxiety' }
    ],
    next: 'checkup'
  },
  
  checkup: {
    id: 'checkup',
    type: 'singleChoice',
    question: 'When was your last medical checkup?',
    options: [
      { id: 'recent', label: 'Within the last 6 months', value: 'recent' },
      { id: 'year', label: 'Within the last year', value: 'year' },
      { id: 'two_years', label: '1-2 years ago', value: 'two_years' },
      { id: 'longer', label: 'More than 2 years ago', value: 'longer' },
      { id: 'never', label: 'Never had a checkup', value: 'never' }
    ],
    next: 'goals'
  },
  
  goals: {
    id: 'goals',
    type: 'textInput',
    question: 'What are your main health and wellness goals?',
    description: 'Please describe what you hope to achieve with our platform',
    validation: { required: true },
    next: 'complete'
  }
};