import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertTriangle, CheckCircle, Info, Calendar, Phone } from 'lucide-react';
import { useAppState } from '../../App';

type Assessment = {
  id: string;
  name: string;
  description: string;
  questions: Question[];
  scoreInterpretation: (score: number) => {
    severity: 'minimal' | 'mild' | 'moderate' | 'severe';
    message: string;
    recommendations: string[];
  };
};

type Question = {
  id: string;
  text: string;
  options: { value: number; label: string }[];
};

export default function AssessmentsPage() {
  const { setCurrentPage } = useAppState();
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<ReturnType<Assessment['scoreInterpretation']> | null>(null);

  const assessments: Assessment[] = [
    {
      id: 'phq9',
      name: 'PHQ-9 Depression Assessment',
      description: 'A 9-question screening tool for depression severity',
      questions: [
        {
          id: 'q1',
          text: 'Little interest or pleasure in doing things',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 'q2',
          text: 'Feeling down, depressed, or hopeless',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 'q3',
          text: 'Trouble falling or staying asleep, or sleeping too much',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 'q4',
          text: 'Feeling tired or having little energy',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 'q5',
          text: 'Poor appetite or overeating',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 'q6',
          text: 'Feeling bad about yourself or that you are a failure',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 'q7',
          text: 'Trouble concentrating on things',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 'q8',
          text: 'Moving or speaking slowly, or being fidgety or restless',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 'q9',
          text: 'Thoughts that you would be better off dead or hurting yourself',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        }
      ],
      scoreInterpretation: (score) => {
        if (score <= 4) {
          return {
            severity: 'minimal',
            message: 'Your responses suggest minimal depression symptoms.',
            recommendations: [
              'Continue maintaining healthy habits',
              'Explore wellness resources in our Resource Hub',
              'Practice regular self-care and stress management'
            ]
          };
        } else if (score <= 9) {
          return {
            severity: 'mild',
            message: 'Your responses suggest mild depression symptoms.',
            recommendations: [
              'Consider exploring relaxation techniques and mindfulness',
              'Use our journaling feature to track your mood',
              'Try meditation and yoga resources',
              'Monitor your symptoms over time'
            ]
          };
        } else if (score <= 14) {
          return {
            severity: 'moderate',
            message: 'Your responses suggest moderate depression symptoms.',
            recommendations: [
              'We recommend booking an appointment with a counselor',
              'Establish a daily routine and self-care practice',
              'Connect with peers in our community forum',
              'Consider professional support to develop coping strategies'
            ]
          };
        } else {
          return {
            severity: 'severe',
            message: 'Your responses suggest moderately severe to severe depression symptoms.',
            recommendations: [
              'We strongly recommend booking an appointment with a counselor immediately',
              'Reach out to crisis support if you\'re having thoughts of self-harm',
              'Call 988 (Suicide & Crisis Lifeline) for immediate support',
              'You are not alone - professional help can make a significant difference'
            ]
          };
        }
      }
    },
    {
      id: 'gad7',
      name: 'GAD-7 Anxiety Assessment',
      description: 'A 7-question screening tool for generalized anxiety disorder',
      questions: [
        {
          id: 'q1',
          text: 'Feeling nervous, anxious, or on edge',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 'q2',
          text: 'Not being able to stop or control worrying',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 'q3',
          text: 'Worrying too much about different things',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 'q4',
          text: 'Trouble relaxing',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 'q5',
          text: 'Being so restless that it\'s hard to sit still',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 'q6',
          text: 'Becoming easily annoyed or irritable',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 'q7',
          text: 'Feeling afraid as if something awful might happen',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        }
      ],
      scoreInterpretation: (score) => {
        if (score <= 4) {
          return {
            severity: 'minimal',
            message: 'Your responses suggest minimal anxiety symptoms.',
            recommendations: [
              'Continue healthy stress management practices',
              'Explore preventive wellness resources',
              'Maintain regular exercise and sleep routines'
            ]
          };
        } else if (score <= 9) {
          return {
            severity: 'mild',
            message: 'Your responses suggest mild anxiety symptoms.',
            recommendations: [
              'Practice breathing exercises and mindfulness',
              'Try our meditation and relaxation resources',
              'Use journaling to identify anxiety triggers',
              'Consider implementing daily stress-reduction techniques'
            ]
          };
        } else if (score <= 14) {
          return {
            severity: 'moderate',
            message: 'Your responses suggest moderate anxiety symptoms.',
            recommendations: [
              'We recommend booking an appointment with a counselor',
              'Learn and practice CBT techniques',
              'Join our community support groups',
              'Develop a personalized anxiety management plan'
            ]
          };
        } else {
          return {
            severity: 'severe',
            message: 'Your responses suggest severe anxiety symptoms.',
            recommendations: [
              'We strongly recommend booking an appointment with a counselor immediately',
              'Professional guidance can help you develop effective coping strategies',
              'Crisis support is available 24/7 at 988',
              'You deserve support - reaching out is a sign of strength'
            ]
          };
        }
      }
    },
    {
      id: 'stress',
      name: 'Stress Level Assessment',
      description: 'Evaluate your current stress levels and identify stressors',
      questions: [
        {
          id: 'q1',
          text: 'I feel overwhelmed by my responsibilities',
          options: [
            { value: 0, label: 'Never' },
            { value: 1, label: 'Rarely' },
            { value: 2, label: 'Sometimes' },
            { value: 3, label: 'Often' },
            { value: 4, label: 'Always' }
          ]
        },
        {
          id: 'q2',
          text: 'I have difficulty managing my time effectively',
          options: [
            { value: 0, label: 'Never' },
            { value: 1, label: 'Rarely' },
            { value: 2, label: 'Sometimes' },
            { value: 3, label: 'Often' },
            { value: 4, label: 'Always' }
          ]
        },
        {
          id: 'q3',
          text: 'I feel physically tense or experience headaches',
          options: [
            { value: 0, label: 'Never' },
            { value: 1, label: 'Rarely' },
            { value: 2, label: 'Sometimes' },
            { value: 3, label: 'Often' },
            { value: 4, label: 'Always' }
          ]
        },
        {
          id: 'q4',
          text: 'I struggle to relax or unwind',
          options: [
            { value: 0, label: 'Never' },
            { value: 1, label: 'Rarely' },
            { value: 2, label: 'Sometimes' },
            { value: 3, label: 'Often' },
            { value: 4, label: 'Always' }
          ]
        },
        {
          id: 'q5',
          text: 'I feel irritable or short-tempered',
          options: [
            { value: 0, label: 'Never' },
            { value: 1, label: 'Rarely' },
            { value: 2, label: 'Sometimes' },
            { value: 3, label: 'Often' },
            { value: 4, label: 'Always' }
          ]
        }
      ],
      scoreInterpretation: (score) => {
        if (score <= 5) {
          return {
            severity: 'minimal',
            message: 'Your stress levels appear to be well-managed.',
            recommendations: [
              'Continue your current stress management practices',
              'Explore our resources to maintain balance',
              'Share your strategies in the community forum'
            ]
          };
        } else if (score <= 10) {
          return {
            severity: 'mild',
            message: 'You\'re experiencing mild stress.',
            recommendations: [
              'Implement regular breaks and relaxation time',
              'Try time management and organization tools',
              'Explore stress-relief exercises and meditation',
              'Use our habit tracker to build healthy routines'
            ]
          };
        } else if (score <= 15) {
          return {
            severity: 'moderate',
            message: 'You\'re experiencing moderate stress levels.',
            recommendations: [
              'Consider booking a counseling session',
              'Learn stress management techniques from our resources',
              'Prioritize self-care and set boundaries',
              'Connect with peers who understand your challenges'
            ]
          };
        } else {
          return {
            severity: 'severe',
            message: 'You\'re experiencing high stress levels.',
            recommendations: [
              'We recommend immediate support from a counselor',
              'Identify and address major stressors with professional guidance',
              'Take time to rest and recover',
              'Remember that asking for help is important and brave'
            ]
          };
        }
      }
    }
  ];

  const handleSelectAssessment = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setResult(null);
  };

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (selectedAssessment && currentQuestion < selectedAssessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    if (!selectedAssessment) return;

    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const interpretation = selectedAssessment.scoreInterpretation(totalScore);
    setResult(interpretation);
    setShowResults(true);
  };

  const handleReset = () => {
    setSelectedAssessment(null);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setResult(null);
  };

  const progress = selectedAssessment
    ? ((Object.keys(answers).length / selectedAssessment.questions.length) * 100)
    : 0;

  if (!selectedAssessment) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="mb-2">Self-Assessments</h1>
          <p className="text-muted-foreground mb-8">
            Take a confidential assessment to better understand your mental health
          </p>

          <Alert className="mb-8 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-blue-900 dark:text-blue-100">
              These assessments are screening tools, not diagnostic tests. Results are saved privately and can help guide conversations with counselors.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assessments.map((assessment) => (
              <Card key={assessment.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{assessment.name}</CardTitle>
                  <CardDescription>{assessment.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {assessment.questions.length} questions • 5-10 minutes
                    </p>
                    <Button
                      onClick={() => handleSelectAssessment(assessment)}
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                    >
                      Start Assessment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  if (showResults && result) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Assessment Results</CardTitle>
              <CardDescription>{selectedAssessment.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className={
                result.severity === 'minimal' ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800' :
                result.severity === 'mild' ? 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800' :
                result.severity === 'moderate' ? 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800' :
                'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'
              }>
                {result.severity === 'minimal' && <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />}
                {result.severity === 'mild' && <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                {(result.severity === 'moderate' || result.severity === 'severe') && <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
                <AlertDescription className={
                  result.severity === 'minimal' ? 'text-green-900 dark:text-green-100' :
                  result.severity === 'mild' ? 'text-blue-900 dark:text-blue-100' :
                  result.severity === 'moderate' ? 'text-orange-900 dark:text-orange-100' :
                  'text-red-900 dark:text-red-100'
                }>
                  <p className="mb-2"><span>Severity:</span> <span className="capitalize">{result.severity}</span></p>
                  <p>{result.message}</p>
                </AlertDescription>
              </Alert>

              <div>
                <h3 className="mb-4">AI-Generated Recommendations</h3>
                <ul className="space-y-3">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {result.severity === 'severe' && (
                <Alert className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
                  <Phone className="w-4 h-4 text-red-600 dark:text-red-400" />
                  <AlertDescription className="text-red-900 dark:text-red-100">
                    <p className="mb-2">Crisis Resources:</p>
                    <p>• Call 988 for Suicide & Crisis Lifeline</p>
                    <p>• Text "HELLO" to 741741 for Crisis Text Line</p>
                    <p>• Call 911 for emergencies</p>
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                {result.severity !== 'minimal' && (
                  <Button
                    onClick={() => setCurrentPage('appointments')}
                    className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Appointment
                  </Button>
                )}
                <Button
                  onClick={() => setCurrentPage('resources')}
                  variant="outline"
                  className="flex-1"
                >
                  Explore Resources
                </Button>
                <Button onClick={handleReset} variant="outline">
                  Back to Assessments
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  const currentQ = selectedAssessment.questions[currentQuestion];
  const isLastQuestion = currentQuestion === selectedAssessment.questions.length - 1;
  const canProceed = answers[currentQ.id] !== undefined;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>{selectedAssessment.name}</CardTitle>
              <Badge variant="secondary">
                {currentQuestion + 1} / {selectedAssessment.questions.length}
              </Badge>
            </div>
            <Progress value={(currentQuestion / selectedAssessment.questions.length) * 100} className="h-2" />
            <p className="text-sm text-muted-foreground mt-4">
              Over the last 2 weeks, how often have you been bothered by the following:
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-6">{currentQ.text}</h3>
              <RadioGroup
                value={answers[currentQ.id]?.toString()}
                onValueChange={(value) => handleAnswer(currentQ.id, parseInt(value))}
              >
                <div className="space-y-3">
                  {currentQ.options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted transition-colors">
                      <RadioGroupItem value={option.value.toString()} id={`${currentQ.id}-${option.value}`} />
                      <Label htmlFor={`${currentQ.id}-${option.value}`} className="flex-1 cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              {isLastQuestion ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                >
                  Submit Assessment
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                >
                  Next
                </Button>
              )}
            </div>

            <div className="text-center pt-4">
              <Button variant="ghost" onClick={handleReset} className="text-muted-foreground">
                Cancel Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
